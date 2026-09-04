export function stripHtml(html?: string): string {
    if (!html) return '';
    const str = html.replace(/<br\s*\/?>/gi, ' ').replace(/<\/p>/gi, ' ');
    if (typeof document !== 'undefined') {
        const tmp = document.createElement('div');
        tmp.innerHTML = str;
        return (tmp.textContent || tmp.innerText || '').trim();
    }
    return str.replace(/<[^>]*>?/gm, '').trim();
}
