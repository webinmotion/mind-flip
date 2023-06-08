import React, { useState } from 'react';
import { Switch, Route, } from 'react-router-dom';
import TabView from '../TabView';
import Editable from '../Editable';
import PageListing from './PageListing';
import PageViewer from './PageViewer';

export default function App({ fetchPageContent, updatePageContent, pages }) {

    const dateTimeStrFormat = /(\d{1,2})\/(\d{1,2})\/(\d{4}), (\d{1,2}):(\d\d):(\d\d) (.*)/gi
    const [selectedTab, setSelectedTab] = useState(0);
    const [title, setTitle] = React.useState("");

    const tabsInfo = [
        { label: "Pages", link: () => '/' },
        { label: "Editor", link: () => '/editor' },
        { label: "Preview", link: () => `/viewer/${pages.selectedPage || ''}` }
    ];

    function onSubmitPage(content) {
        const now = new Date();
        const dateTimeStr = now.toLocaleString("en-US");
        const pageName = dateTimeStr.replaceAll(dateTimeStrFormat, `$1_$2_$3-$4_$5_$7-${title}.md`);
        updatePageContent(pageName, content);
        setTitle("");
        setSelectedTab(2);
    }

    return (
        <div className="app">
            <Switch>
                {/* <TabView tabsInfo={tabsInfo} active={selectedTab} selectTab={setSelectedTab}> */}
                    <Route exact path="/" render={(props) =>
                        <PageListing {...props} />} />
                    <Route path="/editor" render={(props) =>
                        <Editable title={title} setTitle={setTitle} onSubmit={onSubmitPage} {...props} />} />
                    <Route path="/viewer/:pageName" render={(props) =>
                        <PageViewer fetchPageContent={fetchPageContent} setSelectedTab={setSelectedTab} selectedPage={pages.selectedPage} pages={pages} {...props} />} />
                {/* </TabView> */}
            </Switch>
        </div>
    )
}
