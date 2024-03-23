import { DetailedHTMLProps, HTMLAttributes } from 'react';

type props = Pick<DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, 'style'> & { error?: string };

export function ErrorLabel({ style, error }: props) {
    return (
        <p style={{ 
            ...style,
            marginTop: '5px',
            marginBottom: '5px',
            fontSize: '15px',
            width: '100%',
            textAlign: 'left',
            color: '#f33',  
        }}>
            {error}
        </p>
    );
}