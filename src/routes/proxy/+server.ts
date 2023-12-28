import axios from 'axios';
import type { RequestEvent } from './$types';

export async function GET(requestEvent: RequestEvent) {
    const { url } = requestEvent;
    const imgUrl = url.searchParams.get('url');

    if (!imgUrl) {
        console.error(`ERROR: couldnt find url as query param.`);

        return new Response('Internal Server Error', { status: 500 });
    }

    try {
        const response = await axios.get(imgUrl, { responseType: 'arraybuffer' });

        const maxAge = 10;
        const headers = {
            'Content-Type': 'image/*',
            'Cache-Control': `public, max-age=${maxAge}, s-maxage=${maxAge}`,
        };

        const data = Buffer.from(response.data, 'binary');

        return new Response(data, { status: 200, headers });
    } catch (error) {
        console.error(error);

        return new Response('Internal Server Error', { status: 500 });
    }
}
