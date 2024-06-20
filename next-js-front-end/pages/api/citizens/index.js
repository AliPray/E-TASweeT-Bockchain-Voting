import dbConnect from "../../../utils/dbConnect";
import Citizen from '../../../models/Citizen'


dbConnect();

export default async (req, res) =>{
    const {method} = req;
    
    switch(method){
        case 'GET':
            try{
              const citizens = await Citizen.find({ strictQuery: false });
              
              res.status(200).json({success: true, data: citizens})
            } catch (error){
              res.status(400).json({success: false})
            }
            break;
        case 'POST':
            try{
                 const citizen = await Citizen.create(req.body);


                 res.status(201).json({success: true, data:citizen})
            } catch (error){
                res.status(400).json({success: false})
            }
            break;
        default:
            res.status(400).json({success: false});
            break;
    }

}