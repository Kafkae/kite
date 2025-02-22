import type {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '../../services/db';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'GET':
      return getSettings(req, res);
    case 'POST':
      return updateSettings(req, res);
  }
}

async function getSettings(req: NextApiRequest, res: NextApiResponse) {
  const org = await prisma.org.findFirst();

  res.status(200).json(org);
}

async function updateSettings(req: NextApiRequest, res: NextApiResponse) {
  const {name} = req.body;

  const result = await prisma.org.upsert({
    create: {
      id: 'main',
      name,
    },
    update: {
      name,
    },
    where: {
      id: 'main'
    }
  });

  res.status(200).json(result);
}
