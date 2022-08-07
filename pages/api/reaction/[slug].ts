import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    await supabase.from('reactions').insert({ slug: req.query.slug });
    const body = JSON.parse(req.body);
    const { reaction, type } = body;

    if (reaction === 'like_count') {
      if (type === 'increment') {
        await supabase.rpc('increment_like_count', {
          slug_: req.query.slug,
        });
      } else if (type === 'decrement') {
        await supabase.rpc('decrement_like_count', {
          slug_: req.query.slug,
        });
      }
    }

    if (reaction === 'love_count') {
      if (type === 'increment') {
        await supabase.rpc('increment_love_count', {
          slug_: req.query.slug,
        });
      } else if (type === 'decrement') {
        await supabase.rpc('decrement_love_count', {
          slug_: req.query.slug,
        });
      }
    }

    if (reaction === 'wow_count') {
      if (type === 'increment') {
        await supabase.rpc('increment_wow_count', {
          slug_: req.query.slug,
        });
      } else if (type === 'decrement') {
        await supabase.rpc('decrement_wow_count', {
          slug_: req.query.slug,
        });
      }
    }

    if (reaction === 'yay_count') {
      if (type === 'increment') {
        await supabase.rpc('increment_yay_count', {
          slug_: req.query.slug,
        });
      } else if (type === 'decrement') {
        await supabase.rpc('decrement_yay_count', {
          slug_: req.query.slug,
        });
      }
    }

    return res.status(200).json({
      message: `Successfully performed reaction for: ${req.query.slug}`,
    });
  }

  if (req.method === 'GET') {
    // Query the pages table in the database where slug equals the request params slug.
    const { data } = await supabase
      .from('reactions')
      .select('like_count, love_count, wow_count, yay_count')
      .filter('slug', 'eq', req.query.slug);

    if (data) {
      return res.status(200).json({
        like_count: data[0]?.like_count || 0,
        love_count: data[0]?.love_count || 0,
        wow_count: data[0]?.wow_count || 0,
        yay_count: data[0]?.yay_count || 0,
      });
    }
  }

  return res.status(400).json({
    message: 'error',
  });
}
