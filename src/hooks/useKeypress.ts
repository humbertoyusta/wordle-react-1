import { useEffect } from 'react';

export default function useKeypress(handler: (key: string) => void) {
    useEffect(() => {
        function handleKeypress(e: KeyboardEvent) {
            handler(e.key);
        }
        window.addEventListener('keydown', handleKeypress);
        return () => window.removeEventListener('keydown', handleKeypress);
    }, [handler]);
}