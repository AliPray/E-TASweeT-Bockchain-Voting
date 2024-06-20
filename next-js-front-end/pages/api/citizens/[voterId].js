import dbConnect from '../../../utils/dbConnect';
import Citizen from '../../../models/Citizen';

dbConnect();

export default async (req, res) => {
    
    const {
        query: { voterId},
        method
    } = req;
    req.query.voterId = parseInt(req.query.voterId);
    console.log(req.query)
    switch (method) {
        case 'GET':
            try {
                const citizen = await Citizen.find({voterId:voterId});
                console.log(citizen)
                if (!citizen) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json( citizen );
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}