import type { NextRequest } from 'next/server';

export const config = { runtime: 'edge' };

// This is a mock implementation. In a real scenario, you'd integrate with a database.
const leaderboard = new Map<string, number>();

export default async function handler(req: NextRequest) {
  if (req.method === 'POST') {
    const { player, score } = await req.json();
    leaderboard.set(player, score);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } else if (req.method === 'GET') {
    const sortedLeaderboard = Array.from(leaderboard.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
    return new Response(JSON.stringify(Object.fromEntries(sortedLeaderboard)), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: { 'Allow': 'GET, POST' },
    });
  }
}