import Express from "express";
import axios from "axios";

const router = Express.Router();

const url = process.env.URL_API || "https://openapi.etsy.com/v3/application/"

const getimages = async (id, etsyapikey) => {

    try {

        const data = await axios.get(`${url}listings/${id}/images`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': etsyapikey
            }
        });


        return data.data;
    } catch (error) {
        // console.log("sadas");
        throw Error(error);
    }
}

router.get("/all/:offset", async (req, res) => {

    try {
        const data = await axios.get(`${url}listings/active?offset=${req.params.offset? req.params.offset : 0}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': req.headers["x-api-key"]
            }

        })


        console.log("asd")
        let jsonbe = [];

        for (let index = 0; index < data.data.results.length; index++) {
            const element = data.data.results[index];

            jsonbe.push(await getimages(element.listing_id, req.headers["x-api-key"]));
            
        }

        // console.log(data);

        res.status(200).json({ data: data.data, imgdata: jsonbe });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ status: false, message: error.message });
    }

})



export default router;