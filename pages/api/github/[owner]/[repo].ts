import type { NextApiRequest, NextApiResponse } from 'next';
import generateBrandStats from '../../../../lib/brandStats/brandData';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { owner, repo } = req.query;
  
  try {
    const data = await generateBrandStats(owner as string, repo as string);
    
    res.status(200).json(data);
  } catch (error: any) {
    res.status(404).json({ error: 'Unexpected error.' + error.message });
  }
}