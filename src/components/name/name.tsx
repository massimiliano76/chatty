import React, { useState, FormEvent } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import { useDispatch } from 'react-redux';
import { setAuthor } from '../../data/actions/author';
import { Paper, InputBase, CircularProgress, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import "./name.css";
import chatService from '../../services/chat-service';

export default function NameSelection() {
    const [progress, setProgress] = useState(false);
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    const confirmNameSelection = (e: FormEvent) => {
        e.preventDefault();
        if(name.length > 1) {
            setProgress(true);
            dispatch(setAuthor(name.trim().slice(0, 20)));
            chatService.reset(name, (error) => {
                if(error === 'name_taken') {
                    setError('Il nome scelto è già in uso')
                } else {
                    setError('Si è verificato un errore');
                }
                setProgress(false);
            });
        } else {
            setError('Inserisci un nome valido');
        }
    }

    return (
        <div className="nameSelection">
            <h1>Chatty</h1>
            <p>Questa è un'app di esempio che permette a chiunque sia collegato di scambiare messaggi con le altre persone collegate in contemporanea. 
                Non memorizza i messaggi, che vengono invece conservati solo nel browser, e non utilizza cifratura dei messaggi.</p>
            <p>Scritta utilizzando React, Redux, Socket.io, è possibile trovare il codice qui: <a href="https://github.com/paolo-projects/chatty" target="_blank" rel="noopener noreferrer">https://github.com/paolo-projects/chatty</a></p>
            <h1>Inserisci il tuo nome per iniziare...</h1>
            <div className="nameSelection__container">
                { progress ? <CircularProgress/> : (
                    <form onSubmit={confirmNameSelection}>
                        <Paper className="nameSelection__inputForm">
                            <InputBase className="nameSelection__inputFormInput" placeholder="Nome..." onChange={e => setName(e.target.value)} required />
                            <IconButton className="nameSelection__inputFormButton" type="submit">
                                <CheckIcon/>
                            </IconButton>
                        </Paper>
                    </form>
                ) }
            </div>
            <Snackbar open={error?.length > 0} autoHideDuration={3000} onClose={() => setError('')}>
                <div style={{backgroundColor:'red', color:'white', padding:'16px', borderRadius:'5px'}}>
                    {error}
                    <IconButton size="small" aria-label="close" color="inherit" onClick={() => setError('')}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </div>
            </Snackbar>
        </div>
    );
}
