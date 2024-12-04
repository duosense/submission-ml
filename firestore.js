const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const admin = require('firebase-admin');

// Path ke kredensial
const googleCredsPath = "";

// Menginisialisasi aplikasi Firebase dengan kredensial
initializeApp({
  credential: cert(googleCredsPath)  // Menggunakan file kredensial langsung
});

const db = getFirestore();  // Mendapatkan referensi ke Firestore

// Fungsi untuk menambahkan data ke koleksi 'predictions'
const addPrediction = async (responseId, result, suggestion) => {
  try {
    // Menyusun data yang akan disimpan
    const data = {
      id: responseId,
      result: result,
      suggestion: suggestion,
      createdAt: FieldValue.serverTimestamp(),  // Tanggal dan waktu saat data ditambahkan
    };

    // Menambahkan dokumen baru dengan id sesuai dengan responseId
    const docRef = db.collection('predictions').doc(responseId);
    await docRef.set(data);

    console.log(`Prediction with ID ${responseId} added successfully.`);
  } catch (error) {
    console.error('Error adding prediction: ', error);
  }
};

// Fungsi untuk mendapatkan data dari koleksi 'predictions'
const getPredictionById = async (responseId) => {
  try {
    const docRef = db.collection('predictions').doc(responseId);
    const doc = await docRef.get();

    if (!doc.exists) {
      console.log('No prediction found for ID:', responseId);
      return null;
    } else {
      console.log('Prediction data:', doc.data());
      return doc.data();
    }
  } catch (error) {
    console.error('Error getting prediction: ', error);
  }
};

// Contoh penggunaan
addPrediction('response123', 'positive', 'You should proceed with the plan.')
  .then(() => getPredictionById('response123'));
