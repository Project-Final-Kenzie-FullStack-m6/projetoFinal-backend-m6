import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { IAdversimentRequest, IAdversimentUpdate, IImagemRequest } from "../interfaces/adversiments/adversiments.interface";




const adversimentSerializer: SchemaOf<IAdversimentRequest> = yup.object().shape({
    commentsId: yup.string().notRequired(),
    fuelType: yup.string().max(10).required(),
    image: yup.object().shape({
        imageUrl: yup.string().max(255).required(),
    }),
    mileAge: yup.number().required(),
    userId: yup.string().required(),
    brand: yup.string().max(50).required(),
    price: yup.number().required(),
    color: yup.string().max(20).required(),
    model: yup.string().max(50).required(),
    fipe: yup.number().required(),
    age: yup.number().required()
})

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