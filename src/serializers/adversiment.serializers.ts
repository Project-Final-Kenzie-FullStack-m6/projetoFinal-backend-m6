import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { IAdversimentRequest, IAdversimentUpdate, IImagemRequest } from "../interfaces/adversiments/adversiments.interface";
import { userRequestSeriallizer, userResponse } from './user.serializers';



const adversimentSerializer: SchemaOf<any> = yup.object().shape({
    // commentsId: yup.string().notRequired(),
    images: yup.array(yup.object().shape({imageUrl:yup.string()})),
    user: userResponse,
    fuelType: yup.string().max(10).required(),
    mileAge: yup.number().required(),
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