import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const LoveLetter = () => {
    const lettersData = [
        { id: 1, name: "Joshua", msg: "Wish you the happiest birthday" },
        { id: 2, name: "Joshua", msg: "Hay personas que hacen que los momentos sencillos se sientan más bonitos. Tú has sido una de esas personas para mí." },
        { id: 3, name: "Joshua", msg: "Me gusta compartir música contigo, porque a veces una canción puede decir mucho sin tener que exagerar las palabras." },
        { id: 4, name: "Joshua", msg: "Me gusta que, incluso a la distancia, podamos encontrar formas de pasar tiempo juntos: una serie, una canción, una conversación o un pequeño momento del día." },
        { id: 5, name: "Joshua", msg: "Me gusta escuchar sobre las cosas que disfrutas y esos detalles que hacen que conocerte sea algo especial y único." },
        { id: 6, name: "Joshua", msg: "También me gusta que tengas tus propios gustos, tus ideas y tu forma especial de ver las cosas. Eso hace que cada conversación contigo tenga algo diferente y bonito." },
        { id: 7, name: "Joshua", msg: "Hoy no quiero escribirte algo exagerado. Solo quiero decirte algo sincero: me alegra haberte conocido y me alegra poder compartir este detalle contigo." },
        { id: 8, name: "Joshua", msg: "Espero que tu cumpleaños tenga la calma del azul marino, la vida del verde, lo agradable de tu personalidad y muchas risas bonitas." },
        { id: 9, name: "Joshua", msg: "Joshua" },
    ];
    const [openEnvelope, setOpenEnvelope] = useState(false);
    const [letters, setLetters] = useState([]);
    const [placedLetters, setPlacedLetters] = useState([]);
    const [showCompletion, setShowCompletion] = useState(false);
    const [activeLetterReady, setActiveLetterReady] = useState(false);
    useEffect(() => {
        setLetters(lettersData);
    }, []);

    useEffect(() => {
        if (placedLetters.length === lettersData.length) {
            setShowCompletion(true);
        }
    }, [placedLetters, lettersData.length]);

    useEffect(() => {
        if (!openEnvelope || letters.length === 0) {
            setActiveLetterReady(false);
            return;
        }

        setActiveLetterReady(false);
        const readyTimer = setTimeout(() => setActiveLetterReady(true), 700);

        return () => clearTimeout(readyTimer);
    }, [openEnvelope, letters.length]);

    const handleLetterClick = (event, letterId) => {
        event.preventDefault();
        event.stopPropagation();

        if (!openEnvelope || !activeLetterReady) return;

        const letterToPlace = lettersData.find((letter) => letter.id === letterId);
        if (!letterToPlace) return;

        setLetters((prev) => prev.filter((letter) => letter.id !== letterId));
        setPlacedLetters((prev) =>
            prev.some((letter) => letter.id === letterId) ? prev : [...prev, letterToPlace]
        );
    };

    const navigate = useNavigate();

    const handleReturnHome = () => {
        navigate('/')
    };

    return (
        <main className='munna bg-[#8b0000] h-screen w-full overflow-hidden'>
            {showCompletion && (
                <div className="munna completion-screen">
                    <div className="munna completion-card">
                        <div className="munna completion-cards">
                            {placedLetters.map((letter) => (
                                <div key={letter.id} className="munna completion-card-item">
                                    <p>{letter.msg}</p>
                                    <cite>{letter.name}</cite>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleReturnHome}>Regresar a inicio</button>
                    </div>
                </div>
            )}

            <section className="munna cssletter z-10">
                {false && <div className="munna golden-drop-zone">
                    <div className="munna golden-drop-zone__title">Lugar dorado</div>
                    <div className="munna golden-drop-zone__instructions">Haz click en cada carta para guardarla</div>
                    <div className="munna golden-drop-zone__items">
                        {placedLetters.length === 0 ? (
                            <span className="munna golden-drop-zone__empty">Aún no has guardado ninguna carta</span>
                        ) : (
                            placedLetters.map((letter) => (
                                <span key={letter.id} className="munna golden-drop-zone__item"></span>
                            ))
                        )}
                    </div>
                </div>}

                <div className={`envelope ${openEnvelope ? "active" : ""}`}>
                    <button
                        className="munna heart"
                        id="openEnvelope"
                        aria-label="Open Envelope"
                        onClick={() => setOpenEnvelope(true)}
                    >
                        <span className="munna heart-text">Open</span>
                    </button>
                    <div className="munna envelope-flap text-black relative">
                        <div className='munna absolute left-1/2 top-[20%] -translate-x-1/2 flex items-center justify-center flex-col md:gap-y-2'>
                            <span className='munna font-sriracha md:text-2xl text-lg'>Envelope Of Love</span>
                            <span className='munna font-dancingScript md:text-3xl text-xl'>Dear Elizabeth</span>
                        </div>
                    </div>
                    <div className="munna envelope-folds">
                        <div className="munna envelope-left"></div>
                        <div className="munna envelope-right"></div>
                        <div className="munna envelope-bottom"></div>
                    </div>
                </div>

                <div className={`munna letters ${openEnvelope ? 'letters-open' : 'letters-closed'}`}>
                    {openEnvelope && letters.slice(0, 1).map((letter) => (
                        <blockquote
                            key={letter.id}
                            className={`munna letter center active-letter ${activeLetterReady ? 'letter-ready' : ''}`}
                            id={letter.id}
                            tabIndex={0}
                            onClick={(e) => handleLetterClick(e, letter.id)}
                        >
                            <p>{letter.msg}</p>
                            <cite>{letter.name}</cite>
                        </blockquote>
                    ))}
                </div>
            </section>


            {/* ------------------ Heart Beating  */}
            <div className="munna heart-container absolute top-[20%] md:left-20 left-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="munna heartBeating md:w-[150px] w-[110px] h-[200px]"
                >
                    <path
                        d="M471.7 73.6c-54.5-46.4-136-38.3-186.4 15.8L256 120.6l-29.3-31.2C176.3 35.3 94.8 27.2 40.3 73.6-18 125.4-13.3 221 43 273.7l187.3 177.6a24 24 0 0032.4 0L469 273.7c56.3-52.8 61-148.3 2.7-200.1z"
                        fill="#b10505"
                    />
                </svg>
            </div>
            <div className="munna heart-container absolute bottom-[10%] md:right-20 right-6 rotate-180">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="munna heartBeating md:w-[150px] w-[110px] h-[200px]"
                >
                    <path
                        d="M471.7 73.6c-54.5-46.4-136-38.3-186.4 15.8L256 120.6l-29.3-31.2C176.3 35.3 94.8 27.2 40.3 73.6-18 125.4-13.3 221 43 273.7l187.3 177.6a24 24 0 0032.4 0L469 273.7c56.3-52.8 61-148.3 2.7-200.1z"
                        fill="#b10505"
                    />
                </svg>
            </div>
            {/* ------------------ Heart Falling  */}
            <div className="munna snowflakes z-0">
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />  </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
            </div>
        </main>
    )
}

export default LoveLetter
