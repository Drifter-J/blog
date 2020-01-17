import React from 'react'
import moment from 'moment'
import { css } from '@emotion/core'
import { rhythm } from './typography'

export function isURL(str) {
    let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str))
        return true;

    return false;
}

export function showOriginalReference(str) {
    let origRef = "";
    if ('undefined' !== typeof str && null != str) {
        if (isURL(str)) {
            origRef = "Originally from " + str;
        } else {
            origRef = "Originally by " + str;
        }
    }
    return origRef;
}

export function showDate(startTime, endTime) {
    let date = "";
    if ('undefined' !== typeof startTime && null != startTime) {
        date += moment(startTime).format("DD MMM YYYY");
    }
    if ('undefined' !== typeof endTime && null != endTime) {
        date += " ~ ";
        date += moment(endTime).format("DD MMM YYYY");
    }
    return date;
}

export default class OriginalReference extends React.Component {        
    render() {
        return (
            <div>
                <h1
                    css={css`
                        margin-bottom: ${rhythm(1/4)};
                    `}>
                    {this.props.title}
                </h1>
                <h5
                css={css`
                    color: #bbb;
                    margin-left: ${rhythm(1/3)};
                    margin-bottom: ${rhythm(1/4)};
                `}
                >
                    {showOriginalReference(this.props.url || this.props.author)}
                </h5>
                <h5
                    css={css`
                        color: #bbb;
                        margin-left: ${rhythm(1/3)};
                        margin-bottom: ${rhythm(1/2)};
                    `}>
                    {showDate(this.props.startTime, this.props.endTime)}
                </h5>
                <hr/>
                <div dangerouslySetInnerHTML={{__html: this.props.html}}></div>
            </div>
        );
    }
};