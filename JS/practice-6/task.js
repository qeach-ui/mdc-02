export class Task {
    #title;
    #url;

    constructor(title, urlString) {
        this.#setTitle(title);
        this.#setUrl(urlString);
    }

    get title() { return this.#title; }
    get url() { return this.#url; }

    #setTitle(title) {
        const trimmed = (title || '').trim();
        if (trimmed.length === 0) throw new Error('Название задачи не может быть пустым');
        if (trimmed.length > 50) throw new Error('Название не должно превышать 50 символов');
        this.#title = trimmed;
    }

    #setUrl(urlString) {
        if (!urlString || urlString.trim().length === 0) {
            this.#url = null;
            return;
        }
        try {
            const url = new URL(urlString);
            if (url.protocol !== 'https:') throw new Error('Только HTTPS');
            this.#url = url.href;
        } catch (e) {
            if (e.message === 'Только HTTPS') throw e;
            throw new Error('Некорректный формат ссылки');
        }
    }
}