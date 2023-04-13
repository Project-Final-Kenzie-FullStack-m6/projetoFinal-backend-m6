import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { IAdversimentRequest, IAdversimentUpdate, IImagemResponse } from "../interfaces/adversiments/adversiments.interface";
import { userRequestSeriallizer } from './user.serializers';


const schema:SchemaOf<IImagemResponse> = yup.object().shape({
    imageUrl: yup.string().max(255).required(),
})

const adversimentSerializer: SchemaOf<IAdversimentRequest> = yup.object().shape({
    // comments: yup.string().notRequired(),
    fuelType: yup.string().max(10).required(),
    images: yup.array().of(schema),
    mileAge: yup.number().required(),
    user: userRequestSeriallizer,
    brand: yup.string().max(50).required(),
    price: yup.number().required(),
    color: yup.string().max(20).required(),
    model: yup.string().max(50).required(),
    fipe: yup.number().required(),
    description: yup.string().max(255).required(),
    age: yup.number().required()
}).noUnknown()

const adversimentUpdateSerializer: SchemaOf<IAdversimentUpdate> = yup.object().shape({  
    commentsId: yup.string().notRequired(),
    fuelType: yup.string().max(10).notRequired(),
    mileAge: yup.number().notRequired(),
    userId: yup.string().notRequired(),
    brand: yup.string().max(50).notRequired(),
    price: yup.number().notRequired(),
    color: yup.string().max(20).notRequired(),
    model: yup.string().max(50).notRequired(),
    fipe: yup.number().notRequired(),
    age: yup.number().notRequired(),
    image: yup.object().shape({
        imageUrl: yup.string().max(255).notRequired(),
    })

})

export { adversimentSerializer, adversimentUpdateSerializer}