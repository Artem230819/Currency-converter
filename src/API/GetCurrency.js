import axios from "axios";

export default class GetCurrency {
    static async getAll(){
        const res = await axios.get(`https://api.currencyfreaks.com/latest?apikey=93e70b1392874991bbee3855d1f454c2`)
        return res.data.rates
    }
}