//@ts-ignore

import { Schema, model } from 'mongoose';

// Definición del esquema de imágenes de habitaciones
const RoomImageSchema = new Schema({
  room_id: {
    type: String,  
    required: true
  },
  image_base64: {
    type: String,  
    required: true
  },
  upload_date: {
    type: Date,
    default: Date.now 
  }
});

// Exportar el modelo RoomImage
export const RoomImage = model('RoomImage', RoomImageSchema);
