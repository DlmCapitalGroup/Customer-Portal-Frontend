import React from "react";

interface _props {
    pages?: Array<number>;
    prevStepper?: any;
    nextStepper?: any;
}

const Stepper = (props: _props) => {
    const { pages, prevStepper, nextStepper } = props;
    const [step, setStep] = React.useState(1);
    return (
        <div>
            <h1>Stepper</h1>
        </div>
    );
};

export default Stepper;
