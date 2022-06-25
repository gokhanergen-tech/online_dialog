import { useEffect } from "react";

let clear = null;

const startCanvas = (canvas) => {

	let d = canvas, a = [], y = [], h = [],
		writeMode = false, context = d.getContext("2d"), p = null, v = null, w = false;
	d.style.cursor="none"
	let f = [], g = 0, m = 0, k = [], E = {
		x: 0,
		y: 0
	}, isDrag = false, b = !1, eraseMode = false, S, e = {
		x: 0,
		y: 0
	}, C = 30;
	function D(e, t) {
		var n = e.getBoundingClientRect();
		const scaleX = e.width / n.width;
		const scaleY = e.height / n.height;
		const clientX = (t.clientX ? t.clientX : t?.touches?.item(0)?.clientX)
		const clientY = (t.clientY ? t.clientY : t?.touches?.item(0)?.clientY)
		return {
			x: e = (clientX - n.left) * scaleX,
			y: (clientY - n.top) * scaleY
		}
	}
	function T() {
			context.lineWidth = 1
	}
	async function t() {
		T();
		let fps = 0;
		let counterTakedScreen = 0;
		let passedTime = 0;
		let firstTime = new Date().getTime();
		const render = () => {
			try {

				context.clearRect(0, 0, d.width, d.height),
				context.fillStyle = "white",
				context.fillRect(0, 0, d.width, d.height),
				context.beginPath(),
				context.lineCap = "round",
				context.lineJoin = "round",
					f[0] && context.moveTo(f[0].x, f[0].y),
					f.forEach(e => {
						context.lineTo(e.x, e.y)
					}),
					context.stroke();
				for (let e = 0; e < m; e++) {
					var t = y[e];
					context.font = "30px Arial",
					context.fillStyle = "#000000",
					context.fillText(t.text, t.coordinates.x, t.coordinates.y)
				}
				for (var e = 0; e < g; e++) {
					var n = a[e];
					null == n || n[0]?.isDeleted || (context.beginPath(), context.lineCap = "round", context.lineJoin = "round", context.lineWidth = 1, context.moveTo(n[0]?.x, n[0]?.y), n.forEach(e => {
						context.lineTo(e.x, e.y)
					}), n[0]?.isSelected ? context.strokeStyle = "red" : context.strokeStyle = "black", context.stroke())
				}

				b === true || eraseMode === true ? eraseMode === true ? eraseMode :
					(context.beginPath(),
						context.rect(E.x - C / 2, E.y - C / 2, C, C), context.stroke()) :
					(context.beginPath(),
						context.arc(E.x, E.y, 4, 0, 2 * Math.PI),
						context.fillStyle = "blue",
						context.shadowColor = "#000000",
						context.fill())

				const theTimeOfDifference = new Date().getTime() - firstTime;
				passedTime += theTimeOfDifference;
				if (passedTime > 1000) {
					fps = counterTakedScreen;
					counterTakedScreen = 1;
					passedTime = 0;
				} else {
					counterTakedScreen++;
				}
				context.font = "15px Arial",
				context.fillStyle = "#000000",
				context.fillText("FPS: " + fps, 50, 50)
				firstTime = new Date().getTime();

				window.requestAnimationFrame(render)
			} catch (e) {
				console.log(e)
			}

		}



		window.requestAnimationFrame(render)

		const mouseMove = e => {
			var pos = D(d, e);
			E = pos;
			if (!isDrag || b || eraseMode) {
				if (b)
					for (var n = 0; n < g; n++) {
						var l = a[n];
						if (null != l && !l[0]?.isDeleted)
							for (var i = 0; i < l.length; i++) {
								var s = l[i],
									o = pos.x + C / 2,
									r = pos.y + C / 2;
								if (s.x > pos.x - C / 2 && o > s.x && s.y > pos.y - C / 2 && r > s.y && !l[0].isDeleted) {
									if (!k.includes(l)) {
										k.push(l),
											l[0].isSelected = !0;
										break
									}
								} else
									k.includes(l) && (k.splice(k.indexOf(l), 1), l[0].isSelected = !1)
							}
					}
			} else {
				context.beginPath(), v && context.moveTo(v.x, v.y), context.lineTo(pos.x, pos.y), context.stroke(), v = {
					x: pos.x,
					y: pos.y
				}
				f.push({
					process: "line",
					isDeleted: false,
					x: pos.x,
					y: pos.y,
					isSelected: false
				})
			}
		}
		const mouseDown = e => {
			isDrag = true
		}
		const mouseUp = e => {
			e = D(d, e),
				isDrag = false,
				v = null,
				b ? (k.forEach(e => {
					e[0].isDeleted = !0,
						e[0].isSelected = !1,
						e[0].process = "delete",
						h.push("line"),
						a.splice(a.indexOf(e), 1),
						a.splice(g - 1, 0, e)
				}), k = []) : eraseMode ? S || (S = true, y.splice(m, 0, {
					text: "",
					coordinates: {
						x: e.x,
						y: e.y
					}
				}), m++) : (a.splice(g, 0, f), f = [], g++, h.push("line"))
		}
		const mouseLeave = () => {
			isDrag = false;
			v = null,
				f = []
		}



		const keyDown = e => {
			var t;
			"e" === e.key ? writeMode = !0 : "a" === e.key && 120 !== C && (C += 30),
				"s" === e.key && 30 !== C && (C -= 30),
				"x" === e.key && writeMode && (eraseMode = !1, d.style.cursor = "none", (b = !b) || (k.forEach(e => {
					e[0].isSelected = !1
				}), k = [])),
				"t" === e.key && writeMode && (d.style.cursor = "text", eraseMode = !0),
				"z" === e.key && e.ctrlKey && (m || g) && (t = h[g - 1 + m], 0 < g && "line" === t ? "delete" === a[g - 1][0].process ? (a[g - 1][0].isDeleted = !1, a[g - 1][0].process = "undodelete") : "undodelete" === a[g - 1][0].process ? (a[g - 1][0].isDeleted = !0, a[g - 1][0].process = "againdelete") : "againdelete" === a[g - 1][0].process ? (a[g - 1][0].isDeleted = !1, a[g - 1][0].process = "line") : "line" === a[g - 1][0].process && g-- : 0 < m && "text" === t && m--),
				"y" === e.key && e.ctrlKey && (t = h[g + m], g < a.length && "line" === t ? g++ : m < y.length && "text" === t && m++)
		}
		const keyUp = e => {
			if ("e" === e.key && (writeMode = false), "Enter" === e.key && (S = !1, h.push("text")), "Escape" === e.key && (y.pop(), S = !1, m--), S)
				if (32 <= e.keyCode && e.keyCode <= 1e3) {
					const t = y[y.length - 1];
					t.text += e.key
				} else if (8 === e.keyCode) {
					const n = y[y.length - 1];
					n.text = n.text.substring(0, n.text.length - 1)
				}
		};
		d.addEventListener("mousemove", mouseMove);
		d.addEventListener("mousedown", mouseDown);
		d.addEventListener("mouseup", mouseUp);
		d.addEventListener("mouseleave", mouseLeave);
		d.addEventListener("touchmove", mouseMove);
		d.addEventListener("touchstart", mouseDown);
		d.addEventListener("touchend", mouseUp);
		window.addEventListener("keyup", keyUp);
		window.addEventListener("keydown", keyDown);

		clear = () => {
			console.log("Cleared")
			d.removeEventListener("mousemove", mouseMove),
				d.removeEventListener("mouseup", mouseUp),
				d.removeEventListener("mousedown", mouseDown),
				d.removeEventListener("mouseleave", mouseLeave),
				window.removeEventListener("keydown", keyDown),
				window.removeEventListener("keyup", keyUp),
				clearInterval(render)

		}


	}

	t();

}

export { startCanvas, clear };
