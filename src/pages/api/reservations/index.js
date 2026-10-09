import Reservation from "@/models/Reservation";
import { reservationSchema } from "@/schemas/reservationSchema";
import createHandler from "@/server/createHandler";
import { requireAdmin } from "@/server/guards";
import validate from "@/server/validate";

export default createHandler({
  GET: async (req, res) => {
    requireAdmin(req);
    res.status(200).json(await Reservation.find().sort({ date: 1 }));
  },
  POST: async (req, res) => {
    const reservation = await validate(reservationSchema, req.body);
    res.status(201).json(await Reservation.create(reservation));
  },
});
