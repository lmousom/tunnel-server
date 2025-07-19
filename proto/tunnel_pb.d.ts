import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace tunnel. */
export namespace tunnel {

    /** MessageType enum. */
    enum MessageType {
        UNKNOWN = 0,
        REGISTER = 1,
        REGISTERED = 2,
        REQUEST = 3,
        RESPONSE = 4,
        PING = 5,
        PONG = 6,
        ERROR = 7
    }

    /** Properties of a Header. */
    interface IHeader {

        /** Header key */
        key?: (string|null);

        /** Header value */
        value?: (string|null);
    }

    /** Represents a Header. */
    class Header implements IHeader {

        /**
         * Constructs a new Header.
         * @param [properties] Properties to set
         */
        constructor(properties?: tunnel.IHeader);

        /** Header key. */
        public key: string;

        /** Header value. */
        public value: string;

        /**
         * Creates a new Header instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Header instance
         */
        public static create(properties?: tunnel.IHeader): tunnel.Header;

        /**
         * Encodes the specified Header message. Does not implicitly {@link tunnel.Header.verify|verify} messages.
         * @param message Header message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: tunnel.IHeader, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Header message, length delimited. Does not implicitly {@link tunnel.Header.verify|verify} messages.
         * @param message Header message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: tunnel.IHeader, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Header message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Header
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tunnel.Header;

        /**
         * Decodes a Header message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Header
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tunnel.Header;

        /**
         * Verifies a Header message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Header message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Header
         */
        public static fromObject(object: { [k: string]: any }): tunnel.Header;

        /**
         * Creates a plain object from a Header message. Also converts values to other types if specified.
         * @param message Header
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: tunnel.Header, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Header to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Header
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RegisterMessage. */
    interface IRegisterMessage {

        /** RegisterMessage clientId */
        clientId?: (string|null);

        /** RegisterMessage version */
        version?: (string|null);

        /** RegisterMessage metadata */
        metadata?: ({ [k: string]: string }|null);
    }

    /** Represents a RegisterMessage. */
    class RegisterMessage implements IRegisterMessage {

        /**
         * Constructs a new RegisterMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: tunnel.IRegisterMessage);

        /** RegisterMessage clientId. */
        public clientId: string;

        /** RegisterMessage version. */
        public version: string;

        /** RegisterMessage metadata. */
        public metadata: { [k: string]: string };

        /**
         * Creates a new RegisterMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RegisterMessage instance
         */
        public static create(properties?: tunnel.IRegisterMessage): tunnel.RegisterMessage;

        /**
         * Encodes the specified RegisterMessage message. Does not implicitly {@link tunnel.RegisterMessage.verify|verify} messages.
         * @param message RegisterMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: tunnel.IRegisterMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RegisterMessage message, length delimited. Does not implicitly {@link tunnel.RegisterMessage.verify|verify} messages.
         * @param message RegisterMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: tunnel.IRegisterMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RegisterMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RegisterMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tunnel.RegisterMessage;

        /**
         * Decodes a RegisterMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RegisterMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tunnel.RegisterMessage;

        /**
         * Verifies a RegisterMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RegisterMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RegisterMessage
         */
        public static fromObject(object: { [k: string]: any }): tunnel.RegisterMessage;

        /**
         * Creates a plain object from a RegisterMessage message. Also converts values to other types if specified.
         * @param message RegisterMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: tunnel.RegisterMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RegisterMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RegisterMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RegisteredMessage. */
    interface IRegisteredMessage {

        /** RegisteredMessage clientId */
        clientId?: (string|null);

        /** RegisteredMessage message */
        message?: (string|null);

        /** RegisteredMessage success */
        success?: (boolean|null);

        /** RegisteredMessage serverInfo */
        serverInfo?: ({ [k: string]: string }|null);
    }

    /** Represents a RegisteredMessage. */
    class RegisteredMessage implements IRegisteredMessage {

        /**
         * Constructs a new RegisteredMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: tunnel.IRegisteredMessage);

        /** RegisteredMessage clientId. */
        public clientId: string;

        /** RegisteredMessage message. */
        public message: string;

        /** RegisteredMessage success. */
        public success: boolean;

        /** RegisteredMessage serverInfo. */
        public serverInfo: { [k: string]: string };

        /**
         * Creates a new RegisteredMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RegisteredMessage instance
         */
        public static create(properties?: tunnel.IRegisteredMessage): tunnel.RegisteredMessage;

        /**
         * Encodes the specified RegisteredMessage message. Does not implicitly {@link tunnel.RegisteredMessage.verify|verify} messages.
         * @param message RegisteredMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: tunnel.IRegisteredMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RegisteredMessage message, length delimited. Does not implicitly {@link tunnel.RegisteredMessage.verify|verify} messages.
         * @param message RegisteredMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: tunnel.IRegisteredMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RegisteredMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RegisteredMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tunnel.RegisteredMessage;

        /**
         * Decodes a RegisteredMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RegisteredMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tunnel.RegisteredMessage;

        /**
         * Verifies a RegisteredMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RegisteredMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RegisteredMessage
         */
        public static fromObject(object: { [k: string]: any }): tunnel.RegisteredMessage;

        /**
         * Creates a plain object from a RegisteredMessage message. Also converts values to other types if specified.
         * @param message RegisteredMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: tunnel.RegisteredMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RegisteredMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RegisteredMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RequestMessage. */
    interface IRequestMessage {

        /** RequestMessage reqId */
        reqId?: (string|null);

        /** RequestMessage method */
        method?: (string|null);

        /** RequestMessage path */
        path?: (string|null);

        /** RequestMessage headers */
        headers?: (tunnel.IHeader[]|null);

        /** RequestMessage body */
        body?: (Uint8Array|null);

        /** RequestMessage bodyLength */
        bodyLength?: (number|null);

        /** RequestMessage timestamp */
        timestamp?: (number|Long|null);
    }

    /** Represents a RequestMessage. */
    class RequestMessage implements IRequestMessage {

        /**
         * Constructs a new RequestMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: tunnel.IRequestMessage);

        /** RequestMessage reqId. */
        public reqId: string;

        /** RequestMessage method. */
        public method: string;

        /** RequestMessage path. */
        public path: string;

        /** RequestMessage headers. */
        public headers: tunnel.IHeader[];

        /** RequestMessage body. */
        public body: Uint8Array;

        /** RequestMessage bodyLength. */
        public bodyLength: number;

        /** RequestMessage timestamp. */
        public timestamp: (number|Long);

        /**
         * Creates a new RequestMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestMessage instance
         */
        public static create(properties?: tunnel.IRequestMessage): tunnel.RequestMessage;

        /**
         * Encodes the specified RequestMessage message. Does not implicitly {@link tunnel.RequestMessage.verify|verify} messages.
         * @param message RequestMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: tunnel.IRequestMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RequestMessage message, length delimited. Does not implicitly {@link tunnel.RequestMessage.verify|verify} messages.
         * @param message RequestMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: tunnel.IRequestMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RequestMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RequestMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tunnel.RequestMessage;

        /**
         * Decodes a RequestMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RequestMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tunnel.RequestMessage;

        /**
         * Verifies a RequestMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RequestMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RequestMessage
         */
        public static fromObject(object: { [k: string]: any }): tunnel.RequestMessage;

        /**
         * Creates a plain object from a RequestMessage message. Also converts values to other types if specified.
         * @param message RequestMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: tunnel.RequestMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RequestMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RequestMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ResponseMessage. */
    interface IResponseMessage {

        /** ResponseMessage reqId */
        reqId?: (string|null);

        /** ResponseMessage status */
        status?: (number|null);

        /** ResponseMessage headers */
        headers?: (tunnel.IHeader[]|null);

        /** ResponseMessage body */
        body?: (Uint8Array|null);

        /** ResponseMessage bodyLength */
        bodyLength?: (number|null);

        /** ResponseMessage timestamp */
        timestamp?: (number|Long|null);
    }

    /** Represents a ResponseMessage. */
    class ResponseMessage implements IResponseMessage {

        /**
         * Constructs a new ResponseMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: tunnel.IResponseMessage);

        /** ResponseMessage reqId. */
        public reqId: string;

        /** ResponseMessage status. */
        public status: number;

        /** ResponseMessage headers. */
        public headers: tunnel.IHeader[];

        /** ResponseMessage body. */
        public body: Uint8Array;

        /** ResponseMessage bodyLength. */
        public bodyLength: number;

        /** ResponseMessage timestamp. */
        public timestamp: (number|Long);

        /**
         * Creates a new ResponseMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResponseMessage instance
         */
        public static create(properties?: tunnel.IResponseMessage): tunnel.ResponseMessage;

        /**
         * Encodes the specified ResponseMessage message. Does not implicitly {@link tunnel.ResponseMessage.verify|verify} messages.
         * @param message ResponseMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: tunnel.IResponseMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResponseMessage message, length delimited. Does not implicitly {@link tunnel.ResponseMessage.verify|verify} messages.
         * @param message ResponseMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: tunnel.IResponseMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResponseMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResponseMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tunnel.ResponseMessage;

        /**
         * Decodes a ResponseMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResponseMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tunnel.ResponseMessage;

        /**
         * Verifies a ResponseMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResponseMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResponseMessage
         */
        public static fromObject(object: { [k: string]: any }): tunnel.ResponseMessage;

        /**
         * Creates a plain object from a ResponseMessage message. Also converts values to other types if specified.
         * @param message ResponseMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: tunnel.ResponseMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResponseMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ResponseMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an ErrorMessage. */
    interface IErrorMessage {

        /** ErrorMessage reqId */
        reqId?: (string|null);

        /** ErrorMessage errorCode */
        errorCode?: (string|null);

        /** ErrorMessage message */
        message?: (string|null);

        /** ErrorMessage timestamp */
        timestamp?: (number|Long|null);
    }

    /** Represents an ErrorMessage. */
    class ErrorMessage implements IErrorMessage {

        /**
         * Constructs a new ErrorMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: tunnel.IErrorMessage);

        /** ErrorMessage reqId. */
        public reqId: string;

        /** ErrorMessage errorCode. */
        public errorCode: string;

        /** ErrorMessage message. */
        public message: string;

        /** ErrorMessage timestamp. */
        public timestamp: (number|Long);

        /**
         * Creates a new ErrorMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ErrorMessage instance
         */
        public static create(properties?: tunnel.IErrorMessage): tunnel.ErrorMessage;

        /**
         * Encodes the specified ErrorMessage message. Does not implicitly {@link tunnel.ErrorMessage.verify|verify} messages.
         * @param message ErrorMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: tunnel.IErrorMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ErrorMessage message, length delimited. Does not implicitly {@link tunnel.ErrorMessage.verify|verify} messages.
         * @param message ErrorMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: tunnel.IErrorMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ErrorMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ErrorMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tunnel.ErrorMessage;

        /**
         * Decodes an ErrorMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ErrorMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tunnel.ErrorMessage;

        /**
         * Verifies an ErrorMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ErrorMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ErrorMessage
         */
        public static fromObject(object: { [k: string]: any }): tunnel.ErrorMessage;

        /**
         * Creates a plain object from an ErrorMessage message. Also converts values to other types if specified.
         * @param message ErrorMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: tunnel.ErrorMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ErrorMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ErrorMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PingMessage. */
    interface IPingMessage {

        /** PingMessage timestamp */
        timestamp?: (number|Long|null);
    }

    /** Represents a PingMessage. */
    class PingMessage implements IPingMessage {

        /**
         * Constructs a new PingMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: tunnel.IPingMessage);

        /** PingMessage timestamp. */
        public timestamp: (number|Long);

        /**
         * Creates a new PingMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PingMessage instance
         */
        public static create(properties?: tunnel.IPingMessage): tunnel.PingMessage;

        /**
         * Encodes the specified PingMessage message. Does not implicitly {@link tunnel.PingMessage.verify|verify} messages.
         * @param message PingMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: tunnel.IPingMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PingMessage message, length delimited. Does not implicitly {@link tunnel.PingMessage.verify|verify} messages.
         * @param message PingMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: tunnel.IPingMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PingMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PingMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tunnel.PingMessage;

        /**
         * Decodes a PingMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PingMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tunnel.PingMessage;

        /**
         * Verifies a PingMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PingMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PingMessage
         */
        public static fromObject(object: { [k: string]: any }): tunnel.PingMessage;

        /**
         * Creates a plain object from a PingMessage message. Also converts values to other types if specified.
         * @param message PingMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: tunnel.PingMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PingMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PingMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PongMessage. */
    interface IPongMessage {

        /** PongMessage timestamp */
        timestamp?: (number|Long|null);

        /** PongMessage latency */
        latency?: (number|Long|null);
    }

    /** Represents a PongMessage. */
    class PongMessage implements IPongMessage {

        /**
         * Constructs a new PongMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: tunnel.IPongMessage);

        /** PongMessage timestamp. */
        public timestamp: (number|Long);

        /** PongMessage latency. */
        public latency: (number|Long);

        /**
         * Creates a new PongMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PongMessage instance
         */
        public static create(properties?: tunnel.IPongMessage): tunnel.PongMessage;

        /**
         * Encodes the specified PongMessage message. Does not implicitly {@link tunnel.PongMessage.verify|verify} messages.
         * @param message PongMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: tunnel.IPongMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PongMessage message, length delimited. Does not implicitly {@link tunnel.PongMessage.verify|verify} messages.
         * @param message PongMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: tunnel.IPongMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PongMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PongMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tunnel.PongMessage;

        /**
         * Decodes a PongMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PongMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tunnel.PongMessage;

        /**
         * Verifies a PongMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PongMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PongMessage
         */
        public static fromObject(object: { [k: string]: any }): tunnel.PongMessage;

        /**
         * Creates a plain object from a PongMessage message. Also converts values to other types if specified.
         * @param message PongMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: tunnel.PongMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PongMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PongMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a TunnelMessage. */
    interface ITunnelMessage {

        /** TunnelMessage type */
        type?: (tunnel.MessageType|null);

        /** TunnelMessage messageId */
        messageId?: (string|null);

        /** TunnelMessage timestamp */
        timestamp?: (number|Long|null);

        /** TunnelMessage register */
        register?: (tunnel.IRegisterMessage|null);

        /** TunnelMessage registered */
        registered?: (tunnel.IRegisteredMessage|null);

        /** TunnelMessage request */
        request?: (tunnel.IRequestMessage|null);

        /** TunnelMessage response */
        response?: (tunnel.IResponseMessage|null);

        /** TunnelMessage error */
        error?: (tunnel.IErrorMessage|null);

        /** TunnelMessage ping */
        ping?: (tunnel.IPingMessage|null);

        /** TunnelMessage pong */
        pong?: (tunnel.IPongMessage|null);
    }

    /** Represents a TunnelMessage. */
    class TunnelMessage implements ITunnelMessage {

        /**
         * Constructs a new TunnelMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: tunnel.ITunnelMessage);

        /** TunnelMessage type. */
        public type: tunnel.MessageType;

        /** TunnelMessage messageId. */
        public messageId: string;

        /** TunnelMessage timestamp. */
        public timestamp: (number|Long);

        /** TunnelMessage register. */
        public register?: (tunnel.IRegisterMessage|null);

        /** TunnelMessage registered. */
        public registered?: (tunnel.IRegisteredMessage|null);

        /** TunnelMessage request. */
        public request?: (tunnel.IRequestMessage|null);

        /** TunnelMessage response. */
        public response?: (tunnel.IResponseMessage|null);

        /** TunnelMessage error. */
        public error?: (tunnel.IErrorMessage|null);

        /** TunnelMessage ping. */
        public ping?: (tunnel.IPingMessage|null);

        /** TunnelMessage pong. */
        public pong?: (tunnel.IPongMessage|null);

        /**
         * Creates a new TunnelMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TunnelMessage instance
         */
        public static create(properties?: tunnel.ITunnelMessage): tunnel.TunnelMessage;

        /**
         * Encodes the specified TunnelMessage message. Does not implicitly {@link tunnel.TunnelMessage.verify|verify} messages.
         * @param message TunnelMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: tunnel.ITunnelMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TunnelMessage message, length delimited. Does not implicitly {@link tunnel.TunnelMessage.verify|verify} messages.
         * @param message TunnelMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: tunnel.ITunnelMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TunnelMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TunnelMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tunnel.TunnelMessage;

        /**
         * Decodes a TunnelMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TunnelMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tunnel.TunnelMessage;

        /**
         * Verifies a TunnelMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TunnelMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TunnelMessage
         */
        public static fromObject(object: { [k: string]: any }): tunnel.TunnelMessage;

        /**
         * Creates a plain object from a TunnelMessage message. Also converts values to other types if specified.
         * @param message TunnelMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: tunnel.TunnelMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TunnelMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for TunnelMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
