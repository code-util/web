async function readMarkdownFile(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch file');

        const text = await response.text();
        const lines = text.split(/\r?\n/); // Split by new lines

        return lines

    } catch (error) {
        console.error('Error reading file:', error);
        return []
    }
}
 
const app = {
    scrolling_content_container: document.querySelector("#scrolling_content"),
    create_scrolling_element: (text) => `<section><p class="reveal-type">${text}</p></section>`,
    load_scrolling_manifesto: async () => {
        const manifesto = await readMarkdownFile('manifesto.md');
        manifesto.forEach(paragraph => {
            app.scrolling_content_container.insertAdjacentHTML('beforeend', app.create_scrolling_element(paragraph))
        })
    },
    __init__: () => {
        app.load_scrolling_manifesto()
    }
}
app.__init__()