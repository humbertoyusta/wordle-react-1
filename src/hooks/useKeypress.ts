import { useEffect } from 'react';

export default function useKeypress(handler: (key: string) => void) {
    useEffect(() => {
        function handleKeypress(e: KeyboardEvent) {
            handler(e.key);
        }
        window.addEventListener('keypress', handleKeypress);
        return () => window.removeEventListener('keypress', handleKeypress);
    }, [handler]);
}