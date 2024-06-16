import { Middleware, MiddlewareAPI } from "redux";
import { getCookie } from "../../utils/utils";
import { TWsSocketMiddlewareActions } from "../types/data";

export const socketMiddleware = (wsUrl: string, wsActions: TWsSocketMiddlewareActions, isAuth: boolean = false): Middleware => {
	return (store: MiddlewareAPI) => {
		let socket: WebSocket | null = null;

		return next => action => {
			const { dispatch } = store;
			const { type, payload } = action as { type: string; payload: any };
			const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;

			if (type === wsInit) {
				if (!isAuth) {
					socket = new WebSocket(wsUrl);
				} else {
					const accessToken = getCookie('token');
					socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
				};
			}
			if (socket) {
				socket.onopen = event => {
					dispatch({ type: onOpen, payload: event });
				};

				socket.onerror = event => {
					dispatch({ type: onError, payload: event });
				};

				socket.onmessage = event => {
					const { data } = event;
					const parsedData = JSON.parse(data);
					const { success, ...restParsedData } = parsedData;
					dispatch({ type: onMessage, payload:  restParsedData});
				};

				socket.onclose = event => {
					dispatch({ type: onClose, payload: event });
				};

				if (type === wsSendMessage) {
					const orders = { ...payload };
					socket.send(JSON.stringify(orders));
				}
			}

			next(action);
		};
	};
};