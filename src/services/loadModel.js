const tf = require('@tensorflow/tfjs-node');
const loadModel = async () => {
  try {
    console.log('Loading model from:', process.env.MODEL_URL);
    const model = await tf.loadGraphModel(process.env.MODEL_URL);
    console.log('Model loaded successfully!');
    return model;
  } catch (error) {
    console.error('Error loading model:', error);
    throw new Error('Failed to load the model.');
  }
}
module.exports = loadModel;
