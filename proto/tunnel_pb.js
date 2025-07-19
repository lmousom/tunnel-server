/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.tunnel = (function() {

    /**
     * Namespace tunnel.
     * @exports tunnel
     * @namespace
     */
    var tunnel = {};

    /**
     * MessageType enum.
     * @name tunnel.MessageType
     * @enum {number}
     * @property {number} UNKNOWN=0 UNKNOWN value
     * @property {number} REGISTER=1 REGISTER value
     * @property {number} REGISTERED=2 REGISTERED value
     * @property {number} REQUEST=3 REQUEST value
     * @property {number} RESPONSE=4 RESPONSE value
     * @property {number} PING=5 PING value
     * @property {number} PONG=6 PONG value
     * @property {number} ERROR=7 ERROR value
     */
    tunnel.MessageType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN"] = 0;
        values[valuesById[1] = "REGISTER"] = 1;
        values[valuesById[2] = "REGISTERED"] = 2;
        values[valuesById[3] = "REQUEST"] = 3;
        values[valuesById[4] = "RESPONSE"] = 4;
        values[valuesById[5] = "PING"] = 5;
        values[valuesById[6] = "PONG"] = 6;
        values[valuesById[7] = "ERROR"] = 7;
        return values;
    })();

    tunnel.Header = (function() {

        /**
         * Properties of a Header.
         * @memberof tunnel
         * @interface IHeader
         * @property {string|null} [key] Header key
         * @property {string|null} [value] Header value
         */

        /**
         * Constructs a new Header.
         * @memberof tunnel
         * @classdesc Represents a Header.
         * @implements IHeader
         * @constructor
         * @param {tunnel.IHeader=} [properties] Properties to set
         */
        function Header(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Header key.
         * @member {string} key
         * @memberof tunnel.Header
         * @instance
         */
        Header.prototype.key = "";

        /**
         * Header value.
         * @member {string} value
         * @memberof tunnel.Header
         * @instance
         */
        Header.prototype.value = "";

        /**
         * Creates a new Header instance using the specified properties.
         * @function create
         * @memberof tunnel.Header
         * @static
         * @param {tunnel.IHeader=} [properties] Properties to set
         * @returns {tunnel.Header} Header instance
         */
        Header.create = function create(properties) {
            return new Header(properties);
        };

        /**
         * Encodes the specified Header message. Does not implicitly {@link tunnel.Header.verify|verify} messages.
         * @function encode
         * @memberof tunnel.Header
         * @static
         * @param {tunnel.IHeader} message Header message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Header.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.key);
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.value);
            return writer;
        };

        /**
         * Encodes the specified Header message, length delimited. Does not implicitly {@link tunnel.Header.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tunnel.Header
         * @static
         * @param {tunnel.IHeader} message Header message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Header.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Header message from the specified reader or buffer.
         * @function decode
         * @memberof tunnel.Header
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tunnel.Header} Header
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Header.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tunnel.Header();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.key = reader.string();
                        break;
                    }
                case 2: {
                        message.value = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Header message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tunnel.Header
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tunnel.Header} Header
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Header.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Header message.
         * @function verify
         * @memberof tunnel.Header
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Header.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.key != null && message.hasOwnProperty("key"))
                if (!$util.isString(message.key))
                    return "key: string expected";
            if (message.value != null && message.hasOwnProperty("value"))
                if (!$util.isString(message.value))
                    return "value: string expected";
            return null;
        };

        /**
         * Creates a Header message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tunnel.Header
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tunnel.Header} Header
         */
        Header.fromObject = function fromObject(object) {
            if (object instanceof $root.tunnel.Header)
                return object;
            var message = new $root.tunnel.Header();
            if (object.key != null)
                message.key = String(object.key);
            if (object.value != null)
                message.value = String(object.value);
            return message;
        };

        /**
         * Creates a plain object from a Header message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tunnel.Header
         * @static
         * @param {tunnel.Header} message Header
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Header.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.key = "";
                object.value = "";
            }
            if (message.key != null && message.hasOwnProperty("key"))
                object.key = message.key;
            if (message.value != null && message.hasOwnProperty("value"))
                object.value = message.value;
            return object;
        };

        /**
         * Converts this Header to JSON.
         * @function toJSON
         * @memberof tunnel.Header
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Header.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Header
         * @function getTypeUrl
         * @memberof tunnel.Header
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Header.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/tunnel.Header";
        };

        return Header;
    })();

    tunnel.RegisterMessage = (function() {

        /**
         * Properties of a RegisterMessage.
         * @memberof tunnel
         * @interface IRegisterMessage
         * @property {string|null} [clientId] RegisterMessage clientId
         * @property {string|null} [version] RegisterMessage version
         * @property {Object.<string,string>|null} [metadata] RegisterMessage metadata
         */

        /**
         * Constructs a new RegisterMessage.
         * @memberof tunnel
         * @classdesc Represents a RegisterMessage.
         * @implements IRegisterMessage
         * @constructor
         * @param {tunnel.IRegisterMessage=} [properties] Properties to set
         */
        function RegisterMessage(properties) {
            this.metadata = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RegisterMessage clientId.
         * @member {string} clientId
         * @memberof tunnel.RegisterMessage
         * @instance
         */
        RegisterMessage.prototype.clientId = "";

        /**
         * RegisterMessage version.
         * @member {string} version
         * @memberof tunnel.RegisterMessage
         * @instance
         */
        RegisterMessage.prototype.version = "";

        /**
         * RegisterMessage metadata.
         * @member {Object.<string,string>} metadata
         * @memberof tunnel.RegisterMessage
         * @instance
         */
        RegisterMessage.prototype.metadata = $util.emptyObject;

        /**
         * Creates a new RegisterMessage instance using the specified properties.
         * @function create
         * @memberof tunnel.RegisterMessage
         * @static
         * @param {tunnel.IRegisterMessage=} [properties] Properties to set
         * @returns {tunnel.RegisterMessage} RegisterMessage instance
         */
        RegisterMessage.create = function create(properties) {
            return new RegisterMessage(properties);
        };

        /**
         * Encodes the specified RegisterMessage message. Does not implicitly {@link tunnel.RegisterMessage.verify|verify} messages.
         * @function encode
         * @memberof tunnel.RegisterMessage
         * @static
         * @param {tunnel.IRegisterMessage} message RegisterMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RegisterMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.clientId != null && Object.hasOwnProperty.call(message, "clientId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.clientId);
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.version);
            if (message.metadata != null && Object.hasOwnProperty.call(message, "metadata"))
                for (var keys = Object.keys(message.metadata), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.metadata[keys[i]]).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RegisterMessage message, length delimited. Does not implicitly {@link tunnel.RegisterMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tunnel.RegisterMessage
         * @static
         * @param {tunnel.IRegisterMessage} message RegisterMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RegisterMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RegisterMessage message from the specified reader or buffer.
         * @function decode
         * @memberof tunnel.RegisterMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tunnel.RegisterMessage} RegisterMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RegisterMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tunnel.RegisterMessage(), key, value;
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.clientId = reader.string();
                        break;
                    }
                case 2: {
                        message.version = reader.string();
                        break;
                    }
                case 3: {
                        if (message.metadata === $util.emptyObject)
                            message.metadata = {};
                        var end2 = reader.uint32() + reader.pos;
                        key = "";
                        value = "";
                        while (reader.pos < end2) {
                            var tag2 = reader.uint32();
                            switch (tag2 >>> 3) {
                            case 1:
                                key = reader.string();
                                break;
                            case 2:
                                value = reader.string();
                                break;
                            default:
                                reader.skipType(tag2 & 7);
                                break;
                            }
                        }
                        message.metadata[key] = value;
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RegisterMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tunnel.RegisterMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tunnel.RegisterMessage} RegisterMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RegisterMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RegisterMessage message.
         * @function verify
         * @memberof tunnel.RegisterMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RegisterMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.clientId != null && message.hasOwnProperty("clientId"))
                if (!$util.isString(message.clientId))
                    return "clientId: string expected";
            if (message.version != null && message.hasOwnProperty("version"))
                if (!$util.isString(message.version))
                    return "version: string expected";
            if (message.metadata != null && message.hasOwnProperty("metadata")) {
                if (!$util.isObject(message.metadata))
                    return "metadata: object expected";
                var key = Object.keys(message.metadata);
                for (var i = 0; i < key.length; ++i)
                    if (!$util.isString(message.metadata[key[i]]))
                        return "metadata: string{k:string} expected";
            }
            return null;
        };

        /**
         * Creates a RegisterMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tunnel.RegisterMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tunnel.RegisterMessage} RegisterMessage
         */
        RegisterMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.tunnel.RegisterMessage)
                return object;
            var message = new $root.tunnel.RegisterMessage();
            if (object.clientId != null)
                message.clientId = String(object.clientId);
            if (object.version != null)
                message.version = String(object.version);
            if (object.metadata) {
                if (typeof object.metadata !== "object")
                    throw TypeError(".tunnel.RegisterMessage.metadata: object expected");
                message.metadata = {};
                for (var keys = Object.keys(object.metadata), i = 0; i < keys.length; ++i)
                    message.metadata[keys[i]] = String(object.metadata[keys[i]]);
            }
            return message;
        };

        /**
         * Creates a plain object from a RegisterMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tunnel.RegisterMessage
         * @static
         * @param {tunnel.RegisterMessage} message RegisterMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RegisterMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.objects || options.defaults)
                object.metadata = {};
            if (options.defaults) {
                object.clientId = "";
                object.version = "";
            }
            if (message.clientId != null && message.hasOwnProperty("clientId"))
                object.clientId = message.clientId;
            if (message.version != null && message.hasOwnProperty("version"))
                object.version = message.version;
            var keys2;
            if (message.metadata && (keys2 = Object.keys(message.metadata)).length) {
                object.metadata = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.metadata[keys2[j]] = message.metadata[keys2[j]];
            }
            return object;
        };

        /**
         * Converts this RegisterMessage to JSON.
         * @function toJSON
         * @memberof tunnel.RegisterMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RegisterMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RegisterMessage
         * @function getTypeUrl
         * @memberof tunnel.RegisterMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RegisterMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/tunnel.RegisterMessage";
        };

        return RegisterMessage;
    })();

    tunnel.RegisteredMessage = (function() {

        /**
         * Properties of a RegisteredMessage.
         * @memberof tunnel
         * @interface IRegisteredMessage
         * @property {string|null} [clientId] RegisteredMessage clientId
         * @property {string|null} [message] RegisteredMessage message
         * @property {boolean|null} [success] RegisteredMessage success
         * @property {Object.<string,string>|null} [serverInfo] RegisteredMessage serverInfo
         */

        /**
         * Constructs a new RegisteredMessage.
         * @memberof tunnel
         * @classdesc Represents a RegisteredMessage.
         * @implements IRegisteredMessage
         * @constructor
         * @param {tunnel.IRegisteredMessage=} [properties] Properties to set
         */
        function RegisteredMessage(properties) {
            this.serverInfo = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RegisteredMessage clientId.
         * @member {string} clientId
         * @memberof tunnel.RegisteredMessage
         * @instance
         */
        RegisteredMessage.prototype.clientId = "";

        /**
         * RegisteredMessage message.
         * @member {string} message
         * @memberof tunnel.RegisteredMessage
         * @instance
         */
        RegisteredMessage.prototype.message = "";

        /**
         * RegisteredMessage success.
         * @member {boolean} success
         * @memberof tunnel.RegisteredMessage
         * @instance
         */
        RegisteredMessage.prototype.success = false;

        /**
         * RegisteredMessage serverInfo.
         * @member {Object.<string,string>} serverInfo
         * @memberof tunnel.RegisteredMessage
         * @instance
         */
        RegisteredMessage.prototype.serverInfo = $util.emptyObject;

        /**
         * Creates a new RegisteredMessage instance using the specified properties.
         * @function create
         * @memberof tunnel.RegisteredMessage
         * @static
         * @param {tunnel.IRegisteredMessage=} [properties] Properties to set
         * @returns {tunnel.RegisteredMessage} RegisteredMessage instance
         */
        RegisteredMessage.create = function create(properties) {
            return new RegisteredMessage(properties);
        };

        /**
         * Encodes the specified RegisteredMessage message. Does not implicitly {@link tunnel.RegisteredMessage.verify|verify} messages.
         * @function encode
         * @memberof tunnel.RegisteredMessage
         * @static
         * @param {tunnel.IRegisteredMessage} message RegisteredMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RegisteredMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.clientId != null && Object.hasOwnProperty.call(message, "clientId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.clientId);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
            if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.success);
            if (message.serverInfo != null && Object.hasOwnProperty.call(message, "serverInfo"))
                for (var keys = Object.keys(message.serverInfo), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 4, wireType 2 =*/34).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.serverInfo[keys[i]]).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RegisteredMessage message, length delimited. Does not implicitly {@link tunnel.RegisteredMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tunnel.RegisteredMessage
         * @static
         * @param {tunnel.IRegisteredMessage} message RegisteredMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RegisteredMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RegisteredMessage message from the specified reader or buffer.
         * @function decode
         * @memberof tunnel.RegisteredMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tunnel.RegisteredMessage} RegisteredMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RegisteredMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tunnel.RegisteredMessage(), key, value;
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.clientId = reader.string();
                        break;
                    }
                case 2: {
                        message.message = reader.string();
                        break;
                    }
                case 3: {
                        message.success = reader.bool();
                        break;
                    }
                case 4: {
                        if (message.serverInfo === $util.emptyObject)
                            message.serverInfo = {};
                        var end2 = reader.uint32() + reader.pos;
                        key = "";
                        value = "";
                        while (reader.pos < end2) {
                            var tag2 = reader.uint32();
                            switch (tag2 >>> 3) {
                            case 1:
                                key = reader.string();
                                break;
                            case 2:
                                value = reader.string();
                                break;
                            default:
                                reader.skipType(tag2 & 7);
                                break;
                            }
                        }
                        message.serverInfo[key] = value;
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RegisteredMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tunnel.RegisteredMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tunnel.RegisteredMessage} RegisteredMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RegisteredMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RegisteredMessage message.
         * @function verify
         * @memberof tunnel.RegisteredMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RegisteredMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.clientId != null && message.hasOwnProperty("clientId"))
                if (!$util.isString(message.clientId))
                    return "clientId: string expected";
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            if (message.success != null && message.hasOwnProperty("success"))
                if (typeof message.success !== "boolean")
                    return "success: boolean expected";
            if (message.serverInfo != null && message.hasOwnProperty("serverInfo")) {
                if (!$util.isObject(message.serverInfo))
                    return "serverInfo: object expected";
                var key = Object.keys(message.serverInfo);
                for (var i = 0; i < key.length; ++i)
                    if (!$util.isString(message.serverInfo[key[i]]))
                        return "serverInfo: string{k:string} expected";
            }
            return null;
        };

        /**
         * Creates a RegisteredMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tunnel.RegisteredMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tunnel.RegisteredMessage} RegisteredMessage
         */
        RegisteredMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.tunnel.RegisteredMessage)
                return object;
            var message = new $root.tunnel.RegisteredMessage();
            if (object.clientId != null)
                message.clientId = String(object.clientId);
            if (object.message != null)
                message.message = String(object.message);
            if (object.success != null)
                message.success = Boolean(object.success);
            if (object.serverInfo) {
                if (typeof object.serverInfo !== "object")
                    throw TypeError(".tunnel.RegisteredMessage.serverInfo: object expected");
                message.serverInfo = {};
                for (var keys = Object.keys(object.serverInfo), i = 0; i < keys.length; ++i)
                    message.serverInfo[keys[i]] = String(object.serverInfo[keys[i]]);
            }
            return message;
        };

        /**
         * Creates a plain object from a RegisteredMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tunnel.RegisteredMessage
         * @static
         * @param {tunnel.RegisteredMessage} message RegisteredMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RegisteredMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.objects || options.defaults)
                object.serverInfo = {};
            if (options.defaults) {
                object.clientId = "";
                object.message = "";
                object.success = false;
            }
            if (message.clientId != null && message.hasOwnProperty("clientId"))
                object.clientId = message.clientId;
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            if (message.success != null && message.hasOwnProperty("success"))
                object.success = message.success;
            var keys2;
            if (message.serverInfo && (keys2 = Object.keys(message.serverInfo)).length) {
                object.serverInfo = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.serverInfo[keys2[j]] = message.serverInfo[keys2[j]];
            }
            return object;
        };

        /**
         * Converts this RegisteredMessage to JSON.
         * @function toJSON
         * @memberof tunnel.RegisteredMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RegisteredMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RegisteredMessage
         * @function getTypeUrl
         * @memberof tunnel.RegisteredMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RegisteredMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/tunnel.RegisteredMessage";
        };

        return RegisteredMessage;
    })();

    tunnel.RequestMessage = (function() {

        /**
         * Properties of a RequestMessage.
         * @memberof tunnel
         * @interface IRequestMessage
         * @property {string|null} [reqId] RequestMessage reqId
         * @property {string|null} [method] RequestMessage method
         * @property {string|null} [path] RequestMessage path
         * @property {Array.<tunnel.IHeader>|null} [headers] RequestMessage headers
         * @property {Uint8Array|null} [body] RequestMessage body
         * @property {number|null} [bodyLength] RequestMessage bodyLength
         * @property {number|Long|null} [timestamp] RequestMessage timestamp
         */

        /**
         * Constructs a new RequestMessage.
         * @memberof tunnel
         * @classdesc Represents a RequestMessage.
         * @implements IRequestMessage
         * @constructor
         * @param {tunnel.IRequestMessage=} [properties] Properties to set
         */
        function RequestMessage(properties) {
            this.headers = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RequestMessage reqId.
         * @member {string} reqId
         * @memberof tunnel.RequestMessage
         * @instance
         */
        RequestMessage.prototype.reqId = "";

        /**
         * RequestMessage method.
         * @member {string} method
         * @memberof tunnel.RequestMessage
         * @instance
         */
        RequestMessage.prototype.method = "";

        /**
         * RequestMessage path.
         * @member {string} path
         * @memberof tunnel.RequestMessage
         * @instance
         */
        RequestMessage.prototype.path = "";

        /**
         * RequestMessage headers.
         * @member {Array.<tunnel.IHeader>} headers
         * @memberof tunnel.RequestMessage
         * @instance
         */
        RequestMessage.prototype.headers = $util.emptyArray;

        /**
         * RequestMessage body.
         * @member {Uint8Array} body
         * @memberof tunnel.RequestMessage
         * @instance
         */
        RequestMessage.prototype.body = $util.newBuffer([]);

        /**
         * RequestMessage bodyLength.
         * @member {number} bodyLength
         * @memberof tunnel.RequestMessage
         * @instance
         */
        RequestMessage.prototype.bodyLength = 0;

        /**
         * RequestMessage timestamp.
         * @member {number|Long} timestamp
         * @memberof tunnel.RequestMessage
         * @instance
         */
        RequestMessage.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new RequestMessage instance using the specified properties.
         * @function create
         * @memberof tunnel.RequestMessage
         * @static
         * @param {tunnel.IRequestMessage=} [properties] Properties to set
         * @returns {tunnel.RequestMessage} RequestMessage instance
         */
        RequestMessage.create = function create(properties) {
            return new RequestMessage(properties);
        };

        /**
         * Encodes the specified RequestMessage message. Does not implicitly {@link tunnel.RequestMessage.verify|verify} messages.
         * @function encode
         * @memberof tunnel.RequestMessage
         * @static
         * @param {tunnel.IRequestMessage} message RequestMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RequestMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.reqId != null && Object.hasOwnProperty.call(message, "reqId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.reqId);
            if (message.method != null && Object.hasOwnProperty.call(message, "method"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.method);
            if (message.path != null && Object.hasOwnProperty.call(message, "path"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.path);
            if (message.headers != null && message.headers.length)
                for (var i = 0; i < message.headers.length; ++i)
                    $root.tunnel.Header.encode(message.headers[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.body != null && Object.hasOwnProperty.call(message, "body"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.body);
            if (message.bodyLength != null && Object.hasOwnProperty.call(message, "bodyLength"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.bodyLength);
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(/* id 7, wireType 0 =*/56).int64(message.timestamp);
            return writer;
        };

        /**
         * Encodes the specified RequestMessage message, length delimited. Does not implicitly {@link tunnel.RequestMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tunnel.RequestMessage
         * @static
         * @param {tunnel.IRequestMessage} message RequestMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RequestMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RequestMessage message from the specified reader or buffer.
         * @function decode
         * @memberof tunnel.RequestMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tunnel.RequestMessage} RequestMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RequestMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tunnel.RequestMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.reqId = reader.string();
                        break;
                    }
                case 2: {
                        message.method = reader.string();
                        break;
                    }
                case 3: {
                        message.path = reader.string();
                        break;
                    }
                case 4: {
                        if (!(message.headers && message.headers.length))
                            message.headers = [];
                        message.headers.push($root.tunnel.Header.decode(reader, reader.uint32()));
                        break;
                    }
                case 5: {
                        message.body = reader.bytes();
                        break;
                    }
                case 6: {
                        message.bodyLength = reader.int32();
                        break;
                    }
                case 7: {
                        message.timestamp = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RequestMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tunnel.RequestMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tunnel.RequestMessage} RequestMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RequestMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RequestMessage message.
         * @function verify
         * @memberof tunnel.RequestMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RequestMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.reqId != null && message.hasOwnProperty("reqId"))
                if (!$util.isString(message.reqId))
                    return "reqId: string expected";
            if (message.method != null && message.hasOwnProperty("method"))
                if (!$util.isString(message.method))
                    return "method: string expected";
            if (message.path != null && message.hasOwnProperty("path"))
                if (!$util.isString(message.path))
                    return "path: string expected";
            if (message.headers != null && message.hasOwnProperty("headers")) {
                if (!Array.isArray(message.headers))
                    return "headers: array expected";
                for (var i = 0; i < message.headers.length; ++i) {
                    var error = $root.tunnel.Header.verify(message.headers[i]);
                    if (error)
                        return "headers." + error;
                }
            }
            if (message.body != null && message.hasOwnProperty("body"))
                if (!(message.body && typeof message.body.length === "number" || $util.isString(message.body)))
                    return "body: buffer expected";
            if (message.bodyLength != null && message.hasOwnProperty("bodyLength"))
                if (!$util.isInteger(message.bodyLength))
                    return "bodyLength: integer expected";
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
            return null;
        };

        /**
         * Creates a RequestMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tunnel.RequestMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tunnel.RequestMessage} RequestMessage
         */
        RequestMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.tunnel.RequestMessage)
                return object;
            var message = new $root.tunnel.RequestMessage();
            if (object.reqId != null)
                message.reqId = String(object.reqId);
            if (object.method != null)
                message.method = String(object.method);
            if (object.path != null)
                message.path = String(object.path);
            if (object.headers) {
                if (!Array.isArray(object.headers))
                    throw TypeError(".tunnel.RequestMessage.headers: array expected");
                message.headers = [];
                for (var i = 0; i < object.headers.length; ++i) {
                    if (typeof object.headers[i] !== "object")
                        throw TypeError(".tunnel.RequestMessage.headers: object expected");
                    message.headers[i] = $root.tunnel.Header.fromObject(object.headers[i]);
                }
            }
            if (object.body != null)
                if (typeof object.body === "string")
                    $util.base64.decode(object.body, message.body = $util.newBuffer($util.base64.length(object.body)), 0);
                else if (object.body.length >= 0)
                    message.body = object.body;
            if (object.bodyLength != null)
                message.bodyLength = object.bodyLength | 0;
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a RequestMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tunnel.RequestMessage
         * @static
         * @param {tunnel.RequestMessage} message RequestMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RequestMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.headers = [];
            if (options.defaults) {
                object.reqId = "";
                object.method = "";
                object.path = "";
                if (options.bytes === String)
                    object.body = "";
                else {
                    object.body = [];
                    if (options.bytes !== Array)
                        object.body = $util.newBuffer(object.body);
                }
                object.bodyLength = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
            }
            if (message.reqId != null && message.hasOwnProperty("reqId"))
                object.reqId = message.reqId;
            if (message.method != null && message.hasOwnProperty("method"))
                object.method = message.method;
            if (message.path != null && message.hasOwnProperty("path"))
                object.path = message.path;
            if (message.headers && message.headers.length) {
                object.headers = [];
                for (var j = 0; j < message.headers.length; ++j)
                    object.headers[j] = $root.tunnel.Header.toObject(message.headers[j], options);
            }
            if (message.body != null && message.hasOwnProperty("body"))
                object.body = options.bytes === String ? $util.base64.encode(message.body, 0, message.body.length) : options.bytes === Array ? Array.prototype.slice.call(message.body) : message.body;
            if (message.bodyLength != null && message.hasOwnProperty("bodyLength"))
                object.bodyLength = message.bodyLength;
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
            return object;
        };

        /**
         * Converts this RequestMessage to JSON.
         * @function toJSON
         * @memberof tunnel.RequestMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RequestMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RequestMessage
         * @function getTypeUrl
         * @memberof tunnel.RequestMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RequestMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/tunnel.RequestMessage";
        };

        return RequestMessage;
    })();

    tunnel.ResponseMessage = (function() {

        /**
         * Properties of a ResponseMessage.
         * @memberof tunnel
         * @interface IResponseMessage
         * @property {string|null} [reqId] ResponseMessage reqId
         * @property {number|null} [status] ResponseMessage status
         * @property {Array.<tunnel.IHeader>|null} [headers] ResponseMessage headers
         * @property {Uint8Array|null} [body] ResponseMessage body
         * @property {number|null} [bodyLength] ResponseMessage bodyLength
         * @property {number|Long|null} [timestamp] ResponseMessage timestamp
         */

        /**
         * Constructs a new ResponseMessage.
         * @memberof tunnel
         * @classdesc Represents a ResponseMessage.
         * @implements IResponseMessage
         * @constructor
         * @param {tunnel.IResponseMessage=} [properties] Properties to set
         */
        function ResponseMessage(properties) {
            this.headers = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ResponseMessage reqId.
         * @member {string} reqId
         * @memberof tunnel.ResponseMessage
         * @instance
         */
        ResponseMessage.prototype.reqId = "";

        /**
         * ResponseMessage status.
         * @member {number} status
         * @memberof tunnel.ResponseMessage
         * @instance
         */
        ResponseMessage.prototype.status = 0;

        /**
         * ResponseMessage headers.
         * @member {Array.<tunnel.IHeader>} headers
         * @memberof tunnel.ResponseMessage
         * @instance
         */
        ResponseMessage.prototype.headers = $util.emptyArray;

        /**
         * ResponseMessage body.
         * @member {Uint8Array} body
         * @memberof tunnel.ResponseMessage
         * @instance
         */
        ResponseMessage.prototype.body = $util.newBuffer([]);

        /**
         * ResponseMessage bodyLength.
         * @member {number} bodyLength
         * @memberof tunnel.ResponseMessage
         * @instance
         */
        ResponseMessage.prototype.bodyLength = 0;

        /**
         * ResponseMessage timestamp.
         * @member {number|Long} timestamp
         * @memberof tunnel.ResponseMessage
         * @instance
         */
        ResponseMessage.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new ResponseMessage instance using the specified properties.
         * @function create
         * @memberof tunnel.ResponseMessage
         * @static
         * @param {tunnel.IResponseMessage=} [properties] Properties to set
         * @returns {tunnel.ResponseMessage} ResponseMessage instance
         */
        ResponseMessage.create = function create(properties) {
            return new ResponseMessage(properties);
        };

        /**
         * Encodes the specified ResponseMessage message. Does not implicitly {@link tunnel.ResponseMessage.verify|verify} messages.
         * @function encode
         * @memberof tunnel.ResponseMessage
         * @static
         * @param {tunnel.IResponseMessage} message ResponseMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ResponseMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.reqId != null && Object.hasOwnProperty.call(message, "reqId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.reqId);
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.status);
            if (message.headers != null && message.headers.length)
                for (var i = 0; i < message.headers.length; ++i)
                    $root.tunnel.Header.encode(message.headers[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.body != null && Object.hasOwnProperty.call(message, "body"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.body);
            if (message.bodyLength != null && Object.hasOwnProperty.call(message, "bodyLength"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.bodyLength);
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.timestamp);
            return writer;
        };

        /**
         * Encodes the specified ResponseMessage message, length delimited. Does not implicitly {@link tunnel.ResponseMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tunnel.ResponseMessage
         * @static
         * @param {tunnel.IResponseMessage} message ResponseMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ResponseMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ResponseMessage message from the specified reader or buffer.
         * @function decode
         * @memberof tunnel.ResponseMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tunnel.ResponseMessage} ResponseMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ResponseMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tunnel.ResponseMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.reqId = reader.string();
                        break;
                    }
                case 2: {
                        message.status = reader.int32();
                        break;
                    }
                case 3: {
                        if (!(message.headers && message.headers.length))
                            message.headers = [];
                        message.headers.push($root.tunnel.Header.decode(reader, reader.uint32()));
                        break;
                    }
                case 4: {
                        message.body = reader.bytes();
                        break;
                    }
                case 5: {
                        message.bodyLength = reader.int32();
                        break;
                    }
                case 6: {
                        message.timestamp = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ResponseMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tunnel.ResponseMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tunnel.ResponseMessage} ResponseMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ResponseMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ResponseMessage message.
         * @function verify
         * @memberof tunnel.ResponseMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ResponseMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.reqId != null && message.hasOwnProperty("reqId"))
                if (!$util.isString(message.reqId))
                    return "reqId: string expected";
            if (message.status != null && message.hasOwnProperty("status"))
                if (!$util.isInteger(message.status))
                    return "status: integer expected";
            if (message.headers != null && message.hasOwnProperty("headers")) {
                if (!Array.isArray(message.headers))
                    return "headers: array expected";
                for (var i = 0; i < message.headers.length; ++i) {
                    var error = $root.tunnel.Header.verify(message.headers[i]);
                    if (error)
                        return "headers." + error;
                }
            }
            if (message.body != null && message.hasOwnProperty("body"))
                if (!(message.body && typeof message.body.length === "number" || $util.isString(message.body)))
                    return "body: buffer expected";
            if (message.bodyLength != null && message.hasOwnProperty("bodyLength"))
                if (!$util.isInteger(message.bodyLength))
                    return "bodyLength: integer expected";
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
            return null;
        };

        /**
         * Creates a ResponseMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tunnel.ResponseMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tunnel.ResponseMessage} ResponseMessage
         */
        ResponseMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.tunnel.ResponseMessage)
                return object;
            var message = new $root.tunnel.ResponseMessage();
            if (object.reqId != null)
                message.reqId = String(object.reqId);
            if (object.status != null)
                message.status = object.status | 0;
            if (object.headers) {
                if (!Array.isArray(object.headers))
                    throw TypeError(".tunnel.ResponseMessage.headers: array expected");
                message.headers = [];
                for (var i = 0; i < object.headers.length; ++i) {
                    if (typeof object.headers[i] !== "object")
                        throw TypeError(".tunnel.ResponseMessage.headers: object expected");
                    message.headers[i] = $root.tunnel.Header.fromObject(object.headers[i]);
                }
            }
            if (object.body != null)
                if (typeof object.body === "string")
                    $util.base64.decode(object.body, message.body = $util.newBuffer($util.base64.length(object.body)), 0);
                else if (object.body.length >= 0)
                    message.body = object.body;
            if (object.bodyLength != null)
                message.bodyLength = object.bodyLength | 0;
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a ResponseMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tunnel.ResponseMessage
         * @static
         * @param {tunnel.ResponseMessage} message ResponseMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ResponseMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.headers = [];
            if (options.defaults) {
                object.reqId = "";
                object.status = 0;
                if (options.bytes === String)
                    object.body = "";
                else {
                    object.body = [];
                    if (options.bytes !== Array)
                        object.body = $util.newBuffer(object.body);
                }
                object.bodyLength = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
            }
            if (message.reqId != null && message.hasOwnProperty("reqId"))
                object.reqId = message.reqId;
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = message.status;
            if (message.headers && message.headers.length) {
                object.headers = [];
                for (var j = 0; j < message.headers.length; ++j)
                    object.headers[j] = $root.tunnel.Header.toObject(message.headers[j], options);
            }
            if (message.body != null && message.hasOwnProperty("body"))
                object.body = options.bytes === String ? $util.base64.encode(message.body, 0, message.body.length) : options.bytes === Array ? Array.prototype.slice.call(message.body) : message.body;
            if (message.bodyLength != null && message.hasOwnProperty("bodyLength"))
                object.bodyLength = message.bodyLength;
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
            return object;
        };

        /**
         * Converts this ResponseMessage to JSON.
         * @function toJSON
         * @memberof tunnel.ResponseMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ResponseMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ResponseMessage
         * @function getTypeUrl
         * @memberof tunnel.ResponseMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ResponseMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/tunnel.ResponseMessage";
        };

        return ResponseMessage;
    })();

    tunnel.ErrorMessage = (function() {

        /**
         * Properties of an ErrorMessage.
         * @memberof tunnel
         * @interface IErrorMessage
         * @property {string|null} [reqId] ErrorMessage reqId
         * @property {string|null} [errorCode] ErrorMessage errorCode
         * @property {string|null} [message] ErrorMessage message
         * @property {number|Long|null} [timestamp] ErrorMessage timestamp
         */

        /**
         * Constructs a new ErrorMessage.
         * @memberof tunnel
         * @classdesc Represents an ErrorMessage.
         * @implements IErrorMessage
         * @constructor
         * @param {tunnel.IErrorMessage=} [properties] Properties to set
         */
        function ErrorMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ErrorMessage reqId.
         * @member {string} reqId
         * @memberof tunnel.ErrorMessage
         * @instance
         */
        ErrorMessage.prototype.reqId = "";

        /**
         * ErrorMessage errorCode.
         * @member {string} errorCode
         * @memberof tunnel.ErrorMessage
         * @instance
         */
        ErrorMessage.prototype.errorCode = "";

        /**
         * ErrorMessage message.
         * @member {string} message
         * @memberof tunnel.ErrorMessage
         * @instance
         */
        ErrorMessage.prototype.message = "";

        /**
         * ErrorMessage timestamp.
         * @member {number|Long} timestamp
         * @memberof tunnel.ErrorMessage
         * @instance
         */
        ErrorMessage.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new ErrorMessage instance using the specified properties.
         * @function create
         * @memberof tunnel.ErrorMessage
         * @static
         * @param {tunnel.IErrorMessage=} [properties] Properties to set
         * @returns {tunnel.ErrorMessage} ErrorMessage instance
         */
        ErrorMessage.create = function create(properties) {
            return new ErrorMessage(properties);
        };

        /**
         * Encodes the specified ErrorMessage message. Does not implicitly {@link tunnel.ErrorMessage.verify|verify} messages.
         * @function encode
         * @memberof tunnel.ErrorMessage
         * @static
         * @param {tunnel.IErrorMessage} message ErrorMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ErrorMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.reqId != null && Object.hasOwnProperty.call(message, "reqId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.reqId);
            if (message.errorCode != null && Object.hasOwnProperty.call(message, "errorCode"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.errorCode);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.message);
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.timestamp);
            return writer;
        };

        /**
         * Encodes the specified ErrorMessage message, length delimited. Does not implicitly {@link tunnel.ErrorMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tunnel.ErrorMessage
         * @static
         * @param {tunnel.IErrorMessage} message ErrorMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ErrorMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ErrorMessage message from the specified reader or buffer.
         * @function decode
         * @memberof tunnel.ErrorMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tunnel.ErrorMessage} ErrorMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ErrorMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tunnel.ErrorMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.reqId = reader.string();
                        break;
                    }
                case 2: {
                        message.errorCode = reader.string();
                        break;
                    }
                case 3: {
                        message.message = reader.string();
                        break;
                    }
                case 4: {
                        message.timestamp = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ErrorMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tunnel.ErrorMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tunnel.ErrorMessage} ErrorMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ErrorMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ErrorMessage message.
         * @function verify
         * @memberof tunnel.ErrorMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ErrorMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.reqId != null && message.hasOwnProperty("reqId"))
                if (!$util.isString(message.reqId))
                    return "reqId: string expected";
            if (message.errorCode != null && message.hasOwnProperty("errorCode"))
                if (!$util.isString(message.errorCode))
                    return "errorCode: string expected";
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
            return null;
        };

        /**
         * Creates an ErrorMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tunnel.ErrorMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tunnel.ErrorMessage} ErrorMessage
         */
        ErrorMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.tunnel.ErrorMessage)
                return object;
            var message = new $root.tunnel.ErrorMessage();
            if (object.reqId != null)
                message.reqId = String(object.reqId);
            if (object.errorCode != null)
                message.errorCode = String(object.errorCode);
            if (object.message != null)
                message.message = String(object.message);
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from an ErrorMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tunnel.ErrorMessage
         * @static
         * @param {tunnel.ErrorMessage} message ErrorMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ErrorMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.reqId = "";
                object.errorCode = "";
                object.message = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
            }
            if (message.reqId != null && message.hasOwnProperty("reqId"))
                object.reqId = message.reqId;
            if (message.errorCode != null && message.hasOwnProperty("errorCode"))
                object.errorCode = message.errorCode;
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
            return object;
        };

        /**
         * Converts this ErrorMessage to JSON.
         * @function toJSON
         * @memberof tunnel.ErrorMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ErrorMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ErrorMessage
         * @function getTypeUrl
         * @memberof tunnel.ErrorMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ErrorMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/tunnel.ErrorMessage";
        };

        return ErrorMessage;
    })();

    tunnel.PingMessage = (function() {

        /**
         * Properties of a PingMessage.
         * @memberof tunnel
         * @interface IPingMessage
         * @property {number|Long|null} [timestamp] PingMessage timestamp
         */

        /**
         * Constructs a new PingMessage.
         * @memberof tunnel
         * @classdesc Represents a PingMessage.
         * @implements IPingMessage
         * @constructor
         * @param {tunnel.IPingMessage=} [properties] Properties to set
         */
        function PingMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PingMessage timestamp.
         * @member {number|Long} timestamp
         * @memberof tunnel.PingMessage
         * @instance
         */
        PingMessage.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new PingMessage instance using the specified properties.
         * @function create
         * @memberof tunnel.PingMessage
         * @static
         * @param {tunnel.IPingMessage=} [properties] Properties to set
         * @returns {tunnel.PingMessage} PingMessage instance
         */
        PingMessage.create = function create(properties) {
            return new PingMessage(properties);
        };

        /**
         * Encodes the specified PingMessage message. Does not implicitly {@link tunnel.PingMessage.verify|verify} messages.
         * @function encode
         * @memberof tunnel.PingMessage
         * @static
         * @param {tunnel.IPingMessage} message PingMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PingMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.timestamp);
            return writer;
        };

        /**
         * Encodes the specified PingMessage message, length delimited. Does not implicitly {@link tunnel.PingMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tunnel.PingMessage
         * @static
         * @param {tunnel.IPingMessage} message PingMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PingMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PingMessage message from the specified reader or buffer.
         * @function decode
         * @memberof tunnel.PingMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tunnel.PingMessage} PingMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PingMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tunnel.PingMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.timestamp = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PingMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tunnel.PingMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tunnel.PingMessage} PingMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PingMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PingMessage message.
         * @function verify
         * @memberof tunnel.PingMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PingMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
            return null;
        };

        /**
         * Creates a PingMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tunnel.PingMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tunnel.PingMessage} PingMessage
         */
        PingMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.tunnel.PingMessage)
                return object;
            var message = new $root.tunnel.PingMessage();
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a PingMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tunnel.PingMessage
         * @static
         * @param {tunnel.PingMessage} message PingMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PingMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
            return object;
        };

        /**
         * Converts this PingMessage to JSON.
         * @function toJSON
         * @memberof tunnel.PingMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PingMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PingMessage
         * @function getTypeUrl
         * @memberof tunnel.PingMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PingMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/tunnel.PingMessage";
        };

        return PingMessage;
    })();

    tunnel.PongMessage = (function() {

        /**
         * Properties of a PongMessage.
         * @memberof tunnel
         * @interface IPongMessage
         * @property {number|Long|null} [timestamp] PongMessage timestamp
         * @property {number|Long|null} [latency] PongMessage latency
         */

        /**
         * Constructs a new PongMessage.
         * @memberof tunnel
         * @classdesc Represents a PongMessage.
         * @implements IPongMessage
         * @constructor
         * @param {tunnel.IPongMessage=} [properties] Properties to set
         */
        function PongMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PongMessage timestamp.
         * @member {number|Long} timestamp
         * @memberof tunnel.PongMessage
         * @instance
         */
        PongMessage.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PongMessage latency.
         * @member {number|Long} latency
         * @memberof tunnel.PongMessage
         * @instance
         */
        PongMessage.prototype.latency = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new PongMessage instance using the specified properties.
         * @function create
         * @memberof tunnel.PongMessage
         * @static
         * @param {tunnel.IPongMessage=} [properties] Properties to set
         * @returns {tunnel.PongMessage} PongMessage instance
         */
        PongMessage.create = function create(properties) {
            return new PongMessage(properties);
        };

        /**
         * Encodes the specified PongMessage message. Does not implicitly {@link tunnel.PongMessage.verify|verify} messages.
         * @function encode
         * @memberof tunnel.PongMessage
         * @static
         * @param {tunnel.IPongMessage} message PongMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PongMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.timestamp);
            if (message.latency != null && Object.hasOwnProperty.call(message, "latency"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.latency);
            return writer;
        };

        /**
         * Encodes the specified PongMessage message, length delimited. Does not implicitly {@link tunnel.PongMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tunnel.PongMessage
         * @static
         * @param {tunnel.IPongMessage} message PongMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PongMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PongMessage message from the specified reader or buffer.
         * @function decode
         * @memberof tunnel.PongMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tunnel.PongMessage} PongMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PongMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tunnel.PongMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.timestamp = reader.int64();
                        break;
                    }
                case 2: {
                        message.latency = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PongMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tunnel.PongMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tunnel.PongMessage} PongMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PongMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PongMessage message.
         * @function verify
         * @memberof tunnel.PongMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PongMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
            if (message.latency != null && message.hasOwnProperty("latency"))
                if (!$util.isInteger(message.latency) && !(message.latency && $util.isInteger(message.latency.low) && $util.isInteger(message.latency.high)))
                    return "latency: integer|Long expected";
            return null;
        };

        /**
         * Creates a PongMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tunnel.PongMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tunnel.PongMessage} PongMessage
         */
        PongMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.tunnel.PongMessage)
                return object;
            var message = new $root.tunnel.PongMessage();
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
            if (object.latency != null)
                if ($util.Long)
                    (message.latency = $util.Long.fromValue(object.latency)).unsigned = false;
                else if (typeof object.latency === "string")
                    message.latency = parseInt(object.latency, 10);
                else if (typeof object.latency === "number")
                    message.latency = object.latency;
                else if (typeof object.latency === "object")
                    message.latency = new $util.LongBits(object.latency.low >>> 0, object.latency.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a PongMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tunnel.PongMessage
         * @static
         * @param {tunnel.PongMessage} message PongMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PongMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.latency = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.latency = options.longs === String ? "0" : 0;
            }
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
            if (message.latency != null && message.hasOwnProperty("latency"))
                if (typeof message.latency === "number")
                    object.latency = options.longs === String ? String(message.latency) : message.latency;
                else
                    object.latency = options.longs === String ? $util.Long.prototype.toString.call(message.latency) : options.longs === Number ? new $util.LongBits(message.latency.low >>> 0, message.latency.high >>> 0).toNumber() : message.latency;
            return object;
        };

        /**
         * Converts this PongMessage to JSON.
         * @function toJSON
         * @memberof tunnel.PongMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PongMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PongMessage
         * @function getTypeUrl
         * @memberof tunnel.PongMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PongMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/tunnel.PongMessage";
        };

        return PongMessage;
    })();

    tunnel.TunnelMessage = (function() {

        /**
         * Properties of a TunnelMessage.
         * @memberof tunnel
         * @interface ITunnelMessage
         * @property {tunnel.MessageType|null} [type] TunnelMessage type
         * @property {string|null} [messageId] TunnelMessage messageId
         * @property {number|Long|null} [timestamp] TunnelMessage timestamp
         * @property {tunnel.IRegisterMessage|null} [register] TunnelMessage register
         * @property {tunnel.IRegisteredMessage|null} [registered] TunnelMessage registered
         * @property {tunnel.IRequestMessage|null} [request] TunnelMessage request
         * @property {tunnel.IResponseMessage|null} [response] TunnelMessage response
         * @property {tunnel.IErrorMessage|null} [error] TunnelMessage error
         * @property {tunnel.IPingMessage|null} [ping] TunnelMessage ping
         * @property {tunnel.IPongMessage|null} [pong] TunnelMessage pong
         */

        /**
         * Constructs a new TunnelMessage.
         * @memberof tunnel
         * @classdesc Represents a TunnelMessage.
         * @implements ITunnelMessage
         * @constructor
         * @param {tunnel.ITunnelMessage=} [properties] Properties to set
         */
        function TunnelMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TunnelMessage type.
         * @member {tunnel.MessageType} type
         * @memberof tunnel.TunnelMessage
         * @instance
         */
        TunnelMessage.prototype.type = 0;

        /**
         * TunnelMessage messageId.
         * @member {string} messageId
         * @memberof tunnel.TunnelMessage
         * @instance
         */
        TunnelMessage.prototype.messageId = "";

        /**
         * TunnelMessage timestamp.
         * @member {number|Long} timestamp
         * @memberof tunnel.TunnelMessage
         * @instance
         */
        TunnelMessage.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * TunnelMessage register.
         * @member {tunnel.IRegisterMessage|null|undefined} register
         * @memberof tunnel.TunnelMessage
         * @instance
         */
        TunnelMessage.prototype.register = null;

        /**
         * TunnelMessage registered.
         * @member {tunnel.IRegisteredMessage|null|undefined} registered
         * @memberof tunnel.TunnelMessage
         * @instance
         */
        TunnelMessage.prototype.registered = null;

        /**
         * TunnelMessage request.
         * @member {tunnel.IRequestMessage|null|undefined} request
         * @memberof tunnel.TunnelMessage
         * @instance
         */
        TunnelMessage.prototype.request = null;

        /**
         * TunnelMessage response.
         * @member {tunnel.IResponseMessage|null|undefined} response
         * @memberof tunnel.TunnelMessage
         * @instance
         */
        TunnelMessage.prototype.response = null;

        /**
         * TunnelMessage error.
         * @member {tunnel.IErrorMessage|null|undefined} error
         * @memberof tunnel.TunnelMessage
         * @instance
         */
        TunnelMessage.prototype.error = null;

        /**
         * TunnelMessage ping.
         * @member {tunnel.IPingMessage|null|undefined} ping
         * @memberof tunnel.TunnelMessage
         * @instance
         */
        TunnelMessage.prototype.ping = null;

        /**
         * TunnelMessage pong.
         * @member {tunnel.IPongMessage|null|undefined} pong
         * @memberof tunnel.TunnelMessage
         * @instance
         */
        TunnelMessage.prototype.pong = null;

        /**
         * Creates a new TunnelMessage instance using the specified properties.
         * @function create
         * @memberof tunnel.TunnelMessage
         * @static
         * @param {tunnel.ITunnelMessage=} [properties] Properties to set
         * @returns {tunnel.TunnelMessage} TunnelMessage instance
         */
        TunnelMessage.create = function create(properties) {
            return new TunnelMessage(properties);
        };

        /**
         * Encodes the specified TunnelMessage message. Does not implicitly {@link tunnel.TunnelMessage.verify|verify} messages.
         * @function encode
         * @memberof tunnel.TunnelMessage
         * @static
         * @param {tunnel.ITunnelMessage} message TunnelMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TunnelMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.messageId != null && Object.hasOwnProperty.call(message, "messageId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.messageId);
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.timestamp);
            if (message.register != null && Object.hasOwnProperty.call(message, "register"))
                $root.tunnel.RegisterMessage.encode(message.register, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.registered != null && Object.hasOwnProperty.call(message, "registered"))
                $root.tunnel.RegisteredMessage.encode(message.registered, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.request != null && Object.hasOwnProperty.call(message, "request"))
                $root.tunnel.RequestMessage.encode(message.request, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.response != null && Object.hasOwnProperty.call(message, "response"))
                $root.tunnel.ResponseMessage.encode(message.response, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.tunnel.ErrorMessage.encode(message.error, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.ping != null && Object.hasOwnProperty.call(message, "ping"))
                $root.tunnel.PingMessage.encode(message.ping, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.pong != null && Object.hasOwnProperty.call(message, "pong"))
                $root.tunnel.PongMessage.encode(message.pong, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified TunnelMessage message, length delimited. Does not implicitly {@link tunnel.TunnelMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tunnel.TunnelMessage
         * @static
         * @param {tunnel.ITunnelMessage} message TunnelMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TunnelMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TunnelMessage message from the specified reader or buffer.
         * @function decode
         * @memberof tunnel.TunnelMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tunnel.TunnelMessage} TunnelMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TunnelMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tunnel.TunnelMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.type = reader.int32();
                        break;
                    }
                case 2: {
                        message.messageId = reader.string();
                        break;
                    }
                case 3: {
                        message.timestamp = reader.int64();
                        break;
                    }
                case 4: {
                        message.register = $root.tunnel.RegisterMessage.decode(reader, reader.uint32());
                        break;
                    }
                case 5: {
                        message.registered = $root.tunnel.RegisteredMessage.decode(reader, reader.uint32());
                        break;
                    }
                case 6: {
                        message.request = $root.tunnel.RequestMessage.decode(reader, reader.uint32());
                        break;
                    }
                case 7: {
                        message.response = $root.tunnel.ResponseMessage.decode(reader, reader.uint32());
                        break;
                    }
                case 8: {
                        message.error = $root.tunnel.ErrorMessage.decode(reader, reader.uint32());
                        break;
                    }
                case 9: {
                        message.ping = $root.tunnel.PingMessage.decode(reader, reader.uint32());
                        break;
                    }
                case 10: {
                        message.pong = $root.tunnel.PongMessage.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TunnelMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tunnel.TunnelMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tunnel.TunnelMessage} TunnelMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TunnelMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TunnelMessage message.
         * @function verify
         * @memberof tunnel.TunnelMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TunnelMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    break;
                }
            if (message.messageId != null && message.hasOwnProperty("messageId"))
                if (!$util.isString(message.messageId))
                    return "messageId: string expected";
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
            if (message.register != null && message.hasOwnProperty("register")) {
                var error = $root.tunnel.RegisterMessage.verify(message.register);
                if (error)
                    return "register." + error;
            }
            if (message.registered != null && message.hasOwnProperty("registered")) {
                var error = $root.tunnel.RegisteredMessage.verify(message.registered);
                if (error)
                    return "registered." + error;
            }
            if (message.request != null && message.hasOwnProperty("request")) {
                var error = $root.tunnel.RequestMessage.verify(message.request);
                if (error)
                    return "request." + error;
            }
            if (message.response != null && message.hasOwnProperty("response")) {
                var error = $root.tunnel.ResponseMessage.verify(message.response);
                if (error)
                    return "response." + error;
            }
            if (message.error != null && message.hasOwnProperty("error")) {
                var error = $root.tunnel.ErrorMessage.verify(message.error);
                if (error)
                    return "error." + error;
            }
            if (message.ping != null && message.hasOwnProperty("ping")) {
                var error = $root.tunnel.PingMessage.verify(message.ping);
                if (error)
                    return "ping." + error;
            }
            if (message.pong != null && message.hasOwnProperty("pong")) {
                var error = $root.tunnel.PongMessage.verify(message.pong);
                if (error)
                    return "pong." + error;
            }
            return null;
        };

        /**
         * Creates a TunnelMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tunnel.TunnelMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tunnel.TunnelMessage} TunnelMessage
         */
        TunnelMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.tunnel.TunnelMessage)
                return object;
            var message = new $root.tunnel.TunnelMessage();
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "UNKNOWN":
            case 0:
                message.type = 0;
                break;
            case "REGISTER":
            case 1:
                message.type = 1;
                break;
            case "REGISTERED":
            case 2:
                message.type = 2;
                break;
            case "REQUEST":
            case 3:
                message.type = 3;
                break;
            case "RESPONSE":
            case 4:
                message.type = 4;
                break;
            case "PING":
            case 5:
                message.type = 5;
                break;
            case "PONG":
            case 6:
                message.type = 6;
                break;
            case "ERROR":
            case 7:
                message.type = 7;
                break;
            }
            if (object.messageId != null)
                message.messageId = String(object.messageId);
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
            if (object.register != null) {
                if (typeof object.register !== "object")
                    throw TypeError(".tunnel.TunnelMessage.register: object expected");
                message.register = $root.tunnel.RegisterMessage.fromObject(object.register);
            }
            if (object.registered != null) {
                if (typeof object.registered !== "object")
                    throw TypeError(".tunnel.TunnelMessage.registered: object expected");
                message.registered = $root.tunnel.RegisteredMessage.fromObject(object.registered);
            }
            if (object.request != null) {
                if (typeof object.request !== "object")
                    throw TypeError(".tunnel.TunnelMessage.request: object expected");
                message.request = $root.tunnel.RequestMessage.fromObject(object.request);
            }
            if (object.response != null) {
                if (typeof object.response !== "object")
                    throw TypeError(".tunnel.TunnelMessage.response: object expected");
                message.response = $root.tunnel.ResponseMessage.fromObject(object.response);
            }
            if (object.error != null) {
                if (typeof object.error !== "object")
                    throw TypeError(".tunnel.TunnelMessage.error: object expected");
                message.error = $root.tunnel.ErrorMessage.fromObject(object.error);
            }
            if (object.ping != null) {
                if (typeof object.ping !== "object")
                    throw TypeError(".tunnel.TunnelMessage.ping: object expected");
                message.ping = $root.tunnel.PingMessage.fromObject(object.ping);
            }
            if (object.pong != null) {
                if (typeof object.pong !== "object")
                    throw TypeError(".tunnel.TunnelMessage.pong: object expected");
                message.pong = $root.tunnel.PongMessage.fromObject(object.pong);
            }
            return message;
        };

        /**
         * Creates a plain object from a TunnelMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tunnel.TunnelMessage
         * @static
         * @param {tunnel.TunnelMessage} message TunnelMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TunnelMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.type = options.enums === String ? "UNKNOWN" : 0;
                object.messageId = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
                object.register = null;
                object.registered = null;
                object.request = null;
                object.response = null;
                object.error = null;
                object.ping = null;
                object.pong = null;
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.tunnel.MessageType[message.type] === undefined ? message.type : $root.tunnel.MessageType[message.type] : message.type;
            if (message.messageId != null && message.hasOwnProperty("messageId"))
                object.messageId = message.messageId;
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
            if (message.register != null && message.hasOwnProperty("register"))
                object.register = $root.tunnel.RegisterMessage.toObject(message.register, options);
            if (message.registered != null && message.hasOwnProperty("registered"))
                object.registered = $root.tunnel.RegisteredMessage.toObject(message.registered, options);
            if (message.request != null && message.hasOwnProperty("request"))
                object.request = $root.tunnel.RequestMessage.toObject(message.request, options);
            if (message.response != null && message.hasOwnProperty("response"))
                object.response = $root.tunnel.ResponseMessage.toObject(message.response, options);
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = $root.tunnel.ErrorMessage.toObject(message.error, options);
            if (message.ping != null && message.hasOwnProperty("ping"))
                object.ping = $root.tunnel.PingMessage.toObject(message.ping, options);
            if (message.pong != null && message.hasOwnProperty("pong"))
                object.pong = $root.tunnel.PongMessage.toObject(message.pong, options);
            return object;
        };

        /**
         * Converts this TunnelMessage to JSON.
         * @function toJSON
         * @memberof tunnel.TunnelMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TunnelMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for TunnelMessage
         * @function getTypeUrl
         * @memberof tunnel.TunnelMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        TunnelMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/tunnel.TunnelMessage";
        };

        return TunnelMessage;
    })();

    return tunnel;
})();

module.exports = $root;
