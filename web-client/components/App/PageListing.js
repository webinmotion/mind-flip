import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';

export default function PageListing() {

    const { setSelectedPage, fetchFolderMetadata, pages } = useAppContext();

    useEffect(() => {
        fetchFolderMetadata(process.env.REACT_APP_PAGES_DIR);
    }, [pages.meta]);

    return (
        <div>{Object.keys(pages.meta).map(key =>
            <p key={key}>
                <Link to={`/viewer/${key}`} onClick={() => setSelectedPage(key)}>{pages.meta[key].name}</Link>
            </p>
        )}
        </div>
    )
}

