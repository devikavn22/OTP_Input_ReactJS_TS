import { useEffect, useRef, useState } from 'react';
import { OTP_RANGE } from './OTPInput.constants';
import { OTPInputProps } from './OTPInput.interface';
import './otpInput.css';


type InputRefs = (HTMLInputElement | null)[];

export default function OTPInput({ length = OTP_RANGE, onComplete }: OTPInputProps) {
    const [inArr, setInArr] = useState<string[]>(new Array(length).fill(""));
    const refArray = useRef<InputRefs>([]);
    

    useEffect(() => {
        refArray.current[0]?.focus();
    }, []);

    const handleOnChange = (value: string, index: number) => {
        if (isNaN(Number(value))) return;

        const newValue = value.trim();
        const newArr = [...inArr];
        newArr[index] = newValue.slice(-1);
        setInArr(newArr);
        
        if (newValue && index < length - 1) {
            refArray.current[index + 1]?.focus();
        }
        
        if (newArr.join('').length === length && onComplete) {
            onComplete(newArr.join(''));
        }
    };

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (!e.currentTarget.value && e.key === "Backspace") {
            refArray.current[index - 1]?.focus();
        }
    };

    return (
        <div className='otp-container'>
            <h2 className='otp-heading'>OTP Input</h2>
            {inArr.map((_, index) => (
                <input
                    type='text'
                    className='otp-input'
                    key={index}
                    value={inArr[index]}
                    ref={(el) => {
                        if (el) refArray.current[index] = el;
                    }}
                    onChange={(e) => handleOnChange(e.target.value, index)}
                    onKeyDown={(e) => handleOnKeyDown(e, index)}
                    maxLength={1}
                />
            ))}
        </div>
    );
}