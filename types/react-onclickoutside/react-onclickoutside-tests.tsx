import * as React from "react";
import { Component, FunctionComponent, MouseEvent } from "react";
import onClickOutside from "react-onclickoutside";

interface TestStatelessProps {
    disableOnClickOutside(): void;
    enableOnClickOutside(): void;
    nonClickOutsideProp: string;
}

function TestStateless(props: TestStatelessProps) {
    return (
        <div onKeyUp={props.enableOnClickOutside} onKeyDown={props.disableOnClickOutside}>
            {props.nonClickOutsideProp}
        </div>
    );
}

const TestConfigObject = onClickOutside(TestStateless, {
    handleClickOutside: () => console.log("Stateless HandleClickOutside"),
    excludeScrollbar: true,
});

<TestConfigObject nonClickOutsideProp="Test" />;

const TestStatelessWrapped = onClickOutside(TestStateless);

<TestStatelessWrapped
    nonClickOutsideProp="Test"
    eventTypes="click"
    disableOnClickOutside
    preventDefault
    stopPropagation
    outsideClickIgnoreClass="ignore"
    handleClickOutside={() => console.log("Stateless HandleClickOutside")}
    excludeScrollbar
/>;
class TestComponent extends React.Component<{ disableOnClickOutside(): void; enableOnClickOutside(): void }> {
    handleClickOutside = () => {
        console.log("this.handleClickOutside");
    };

    logProps = () => {
        console.log(this.props);
    };

    render() {
        this.props.disableOnClickOutside();
        this.props.enableOnClickOutside();
        return <div onClick={this.props.disableOnClickOutside}>TestComponent</div>;
    }
}

const WrappedComponent = onClickOutside(TestComponent);
const wrappedComponentRef: React.RefObject<InstanceType<typeof WrappedComponent> | null> = React.createRef();

<WrappedComponent
    ref={wrappedComponentRef}
    eventTypes="whatever"
    preventDefault
    stopPropagation
/>;

if (wrappedComponentRef.current) {
    wrappedComponentRef.current.getInstance().logProps();
}
