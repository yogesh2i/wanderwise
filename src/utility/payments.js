import Razorpay from "razorpay"
import {razorpayKey, razorpaySecret} from './constants';
export const CREDIT_PACKS = {
    10: 10,
    20: 20,
    30: 30,
    40: 40
}

export const razorpay = new Razorpay({
    key_id: razorpayKey,
    key_secret: razorpaySecret
})
