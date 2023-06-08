import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function PageViewer({ fetchPageContent, setSelectedTab, selectedPage, pages }) {

    useEffect(() => {
        fetchPageContent(selectedPage);
        setSelectedTab(2);
    }, [selectedPage]);

    return (<ReactMarkdown>{pages.markdown}</ReactMarkdown>)
}