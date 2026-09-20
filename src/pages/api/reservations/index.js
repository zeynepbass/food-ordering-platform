import Reservation from "@/models/Reservation";
import createHandler from "@/server/createHandler";
import { requireAdmin } from "@/server/guards";

export default createHandler({
  GET: async (req, res) => {
    requireAdmin(req);
    res.status(200).json(await Reservation.find().sort({ date: 1 }));
  },
  POST: async (req, res) => {
    const { fullName, phoneNumber, email, persons, date } = req.body;
    const reservation = await Reservation.create({
      fullName,
      phoneNumber,
      email,
      persons,
      date,
    });
    res.status(201).json(reservation);
  },
});
