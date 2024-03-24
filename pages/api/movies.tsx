import { ObjectId } from "mongodb"
import clientPromise from "../../lib/mongodb"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise
    const db = client.db("sample_mflix")
    const objectId = req.query.id ? new ObjectId(req.query.id as string) : null
    const num = req.query.num ? parseInt(req.query.num as string) : 10

    if (objectId) {
      const movie = await db.collection("movies").findOne({ _id: objectId })
      res.json(movie)
    } else {
      const movies = await db
        .collection("movies")
        .find({})
        .sort({ metacritic: -1 })
        .limit(num)
        .toArray()
      res.json(movies)
    }
  } catch (e) {
    console.error(e)
  }
}
