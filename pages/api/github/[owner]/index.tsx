import type { NextApiRequest, NextApiResponse } from 'next';
import generateMakeStats from '../../../../lib/makeStats/makeData';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { owner } = req.query;
  
  try {
    const data = await generateMakeStats(owner as string);
    
    res.status(200).json(data);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
}
