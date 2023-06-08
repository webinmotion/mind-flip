import {
    FETCH_FOLDER_METADATA,
    SELECTED_PAGE_CONTENT,
    UPDATED_PAGE_CONTENT,
    SET_SELECTED_PAGE,
}
    from './pagesActions';

export const pagesReducer = (pages, action) => {
    console.log('state type', typeof pages, 'state value', pages);
    switch (action.type) {
        case FETCH_FOLDER_METADATA:
            pages.meta = action.meta;
            return pages;
        case SELECTED_PAGE_CONTENT:
            pages.markdown = action.page;
            return pages;
        case UPDATED_PAGE_CONTENT:
            pages.markdown = action.page.content
            pages.pageName = action.page.name;
            return pages;
        case SET_SELECTED_PAGE:
            pages.selectedPage = action.pageName;
            return pages;
        default:
            return pages;
    }
}