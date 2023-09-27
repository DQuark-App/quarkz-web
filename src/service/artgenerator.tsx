export default class ArtGenerator {
    private static _instance: ArtGenerator
    private constructor() {}

    public async generateArt(
        text: string,
        model: string = 'cute-creature-generator',
        isHD: boolean = false
    ) {
        const params: string[][] = []
        params.push(['text', text.toString()])
        params.push(['grid_size', '1'])
        params.push(['image_generator_version', isHD ? 'hd' : 'standard'])
        params.push(['negative_prompt', process.env.NEGATIVE_PROMPT || ''])

        return await fetch(`${process.env.DEEP_AI_API_URL}${model}`, {
            method: 'POST',
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded; charset=utf-8',
                'api-key': process.env.DEEP_AI_KEY || '',
            },
            body: new URLSearchParams(params),
        })
    }
    public static get instance() {
        if (!this._instance) {
            this._instance = new ArtGenerator()
        }
        return this._instance
    }
}
