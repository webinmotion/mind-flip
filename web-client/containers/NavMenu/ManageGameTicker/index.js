import React, { useEffect, useState } from 'react';
import ManageGameTicker from '../../../components/NavMenu/ManageGameTicker';
import { remoteFetchGameTickers, remoteCreateOrUpdateGameTicker, remoteDeleteGameTicker, } from '../../../services/trivia';

const initialGameTicker = {
    ticker_id: '',
    ticker_title: '',
    pre_countdown_delay: 0,
    countdown_duration: 0,
    post_countdown_delay: 0,
};

function ManageGameTickerContainer({ showAlert }) {

    const [tickers, setTickers] = useState([]);
    const [form, setForm] = useState(initialGameTicker);

    useEffect(() => {
        remoteFetchGameTickers().then(setTickers)
    }, []);

    const handleChange = e => {
        setForm(form => ({ ...form, [e.target.id]: e.target.value }));
    }

    const handleSelect = (e, ticker_id) => {
        const ticker = tickers.find(tck => tck.ticker_id === ticker_id);
        setForm(form => ({ ...form, ...ticker }));
    }

    const handleDelete = async (ticker_id) => {
        const data = await remoteDeleteGameTicker(ticker_id);
        if (data.ticker_id) {
            setTickers(ticker => ticker.filter(tck => tck.ticker_id !== data.ticker_id));
        }
    }

    const updateTickers = async () => {
        if (form.ticker_id) {
            const data = await remoteCreateOrUpdateGameTicker(form);
            if (tickers.findIndex(tck => tck.ticker_id === data.ticker_id) === -1) {
                setTickers(tickers => ({ ...tickers, data }));
            }
            else {
                setTickers(ticker => {
                    return ticker.map(tck => {
                        if (tck.ticker_id === data.ticker_id) {
                            return data;
                        }
                        return tck;
                    });
                });
            }
        }
        else {
            showAlert({
                message: "You must provide a ticker id",
                autoClose: true,
                severity: 'warning',
            })
        }
    }

    return (
        <ManageGameTicker
            tickers={tickers}
            form={form}
            handleChange={handleChange}
            handleSelect={handleSelect}
            handleDelete={handleDelete}
            updateTickers={updateTickers}
        />
    )
}

export default ManageGameTickerContainer