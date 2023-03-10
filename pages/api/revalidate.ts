// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDADE_SECRET) {
    return res.status(401).json({ message: "Invalid token" })
  }

  try {
    // Regenerate our index route showing the images
    await res.revalidate("/")
    return res.json({ revalidated: true })
  } catch (error) {
    // if there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating")
  }
}
