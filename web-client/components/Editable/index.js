import React from 'react';
import sanitizeHtml from "sanitize-html"
import ContentEditable from 'react-contenteditable';

export default function Editable({ title, setTitle, onSubmit }) {

    const contentEditable = React.createRef();

    const sanitizeConf = {
        allowedTags: ["b", "i", "em", "strong", "a", "p", "h1"],
        allowedAttributes: { a: ["href"] }
    };

    const handleChange = evt => {
        contentEditable.current = sanitizeHtml(evt.target.value, sanitizeConf);
    };

    return (
        <section>
            <div>
                <label htmlFor='title'>Title</label>
                <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div style={{ border: "1px solid #333", margin: "10px", borderRadius: "5px" }}>
                <ContentEditable
                    innerRef={contentEditable}
                    onChange={handleChange}
                    html={contentEditable.current || ''}
                    tagName='article' />
            </div>
            <div>
                <input type='button' value="Save" disabled={!title} onClick={() => onSubmit(title, contentEditable.current)} />
            </div>
        </section>
    )
}