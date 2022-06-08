import { useEffect } from "react";

let clear=null;

const startCanvas=(canvas)=>{

	let d = canvas, a = [], y = [], h = [],
	x = !1, u = d.getContext("2d"), p = null,v=null,w=false;
	let f = [], g = 0, m = 0, k = [], E = {
		x: 0,
		y: 0
	}, isDrag = false, b = !1, L = !1, S, e = {
		x: 0,
		y: 0
	}, C = 30;
	function D(e, t) {
		var n = e.getBoundingClientRect();
	    const  scaleX = e.width / n.width;
		const  scaleY = e.height / n.height;
		const clientX=(t.clientX?t.clientX:t.touches.item(0)?.clientX)
		const clientY=(t.clientY?t.clientY:t.touches.item(0)?.clientY)
		return {
			x: e = (clientX - n.left) * scaleX,
			y: (clientY - n.top) * scaleY
		}
	}
	function T() {
		(p = document.createElement("div")).style.border = "1px red dashed",
		p.style.position = "absolute",
		p.style.width = "30px",
		p.style.height = "30px",
		p.style.pointerEvents = "none",
		u.lineWidth = 1
	}
	async function t() {
		T();
		let fps=0;
		let counterTakedScreen=0;
		let passedTime=0;
		let firstTime=new Date().getTime();
		const render = () => {
			try {
				
				u.clearRect(0, 0, d.width, d.height),
				u.fillStyle = "white",
				u.fillRect(0, 0, d.width, d.height),
				u.beginPath(),
				u.lineCap = "round",
				u.lineJoin = "round",
				f[0] && u.moveTo(f[0].x, f[0].y),
				f.forEach(e => {
					u.lineTo(e.x, e.y)
				}),
				u.stroke();
				for (let e = 0; e < m; e++) {
					var t = y[e];
					u.font = "30px Arial",
					u.fillStyle = "#000000",
					u.fillText(t.text, t.coordinates.x, t.coordinates.y)
				}
				for (var e = 0; e < g; e++) {
					var n = a[e];
					null == n || n[0]?.isDeleted || (u.beginPath(), u.lineCap = "round", u.lineJoin = "round", u.lineWidth = 1, u.moveTo(n[0]?.x, n[0]?.y), n.forEach(e => {
							u.lineTo(e.x, e.y)
						}), n[0]?.isSelected?u.strokeStyle = "red" : u.strokeStyle = "black", u.stroke())
				}
							
				 b ===true||L===true?L===true?L:
				(u.beginPath(), 
				u.rect(E.x - C / 2, E.y - C / 2, C, C), u.stroke()) :
				(u.beginPath(), 
				u.arc(E.x, E.y, 2, 0, 2 * Math.PI), 
				u.fillStyle = "blue", 
				u.shadowColor = "#000000", 
				u.fill())
				
				const theTimeOfDifference=new Date().getTime()-firstTime;
				passedTime+=theTimeOfDifference;
				if(passedTime>1000){
					fps=counterTakedScreen;
					counterTakedScreen=1;
					passedTime=0;
				}else{
					counterTakedScreen++;
				}
				u.font = "15px Arial",
				u.fillStyle = "#000000",
				u.fillText("FPS: "+fps, 50, 50)
				firstTime=new Date().getTime();
				
				window.requestAnimationFrame(render)
			} catch (e) {
				console.log(e)
			}
	
		}
		
		
		
		 window.requestAnimationFrame(render)
	
		const mouseMove = e => {
			var pos = D(d, e);
			E=pos;
			if (!isDrag || b || L) {
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
			} else{
				u.beginPath(), v && u.moveTo(v.x, v.y), u.lineTo(pos.x, pos.y), u.stroke(), v = {
					x : pos.x,
					y : pos.y
				}
			f.push({
				process : "line",
				isDeleted : false,
				x : pos.x,
				y: pos.y,
				isSelected: false
			})
			}
		}
		const mouseDown = e => {
			isDrag = !0
		}
		const mouseUp = e => {
			e = D(d, e),
			isDrag = false,
			v = null,
			b?(k.forEach(e => {
					e[0].isDeleted = !0,
					e[0].isSelected = !1,
					e[0].process = "delete",
					h.push("line"),
					a.splice(a.indexOf(e), 1),
					a.splice(g - 1, 0, e)
				}), k = []) : L?S || (S = !0, y.splice(m, 0, {
					text: "",
					coordinates: {
						x: e.x,
						y: e.y
					}
				}), m++) : (a.splice(g, 0, f), f = [], g++, h.push("line"))
		}
		const mouseLeave = () => {
			isDrag=false;
			v = null,
			f = []
		}

		

		const keyDown = e => {
			var t;
			"e" === e.key?x = !0 : "a" === e.key && 120 !== C && (C += 30, p.style.width = C + "px", p.style.height = C + "px"),
			"s" === e.key && 30 !== C && (C -= 30, p.style.width = C + "px", p.style.height = C + "px"),
			"x" === e.key && x && (L = !1, d.style.cursor = "none", (b = !b) || (k.forEach(e => {
						e[0].isSelected = !1
					}), k = [])),
			"t" === e.key && x && (d.style.cursor = "text", L = !0),
			"z" === e.key && e.ctrlKey && (m || g) && (t = h[g - 1 + m], 0 < g && "line" === t?"delete" === a[g - 1][0].process?(a[g - 1][0].isDeleted = !1, a[g - 1][0].process = "undodelete") : "undodelete" === a[g - 1][0].process?(a[g - 1][0].isDeleted = !0, a[g - 1][0].process = "againdelete") : "againdelete" === a[g - 1][0].process?(a[g - 1][0].isDeleted = !1, a[g - 1][0].process = "line") : "line" === a[g - 1][0].process && g-- : 0 < m && "text" === t && m--),
			"y" === e.key && e.ctrlKey && (t = h[g + m], g < a.length && "line" === t?g++ : m < y.length && "text" === t && m++)
		}
		const keyUp = e => {
			if ("e" === e.key && (x = !1), "Enter" === e.key && (S = !1, h.push("text")), "Escape" === e.key && (y.pop(), S = !1, m--), S)
			if (32 <= e.keyCode && e.keyCode <= 1e3) {
					const t = y[y.length - 1];
					t.text += e.key
				} else if (8 === e.keyCode) {
					const n = y[y.length - 1];
					n.text = n.text.substring(0, n.text.length - 1)
				}
		};
		d.addEventListener("mousemove",mouseMove);
		d.addEventListener("mousedown", mouseDown);
		d.addEventListener("mouseup",  mouseUp);
		d.addEventListener("mouseleave", mouseLeave);
		d.addEventListener("touchmove",mouseMove);
		d.addEventListener("touchstart", mouseDown);
		d.addEventListener("touchend",  mouseUp);
		window.addEventListener("keyup", keyUp);
		window.addEventListener("keydown", keyDown);
      
		clear=()=>{
            console.log("Cleared")
			d.removeEventListener("mousemove",mouseMove),
			d.removeEventListener("mouseup",mouseUp),
			d.removeEventListener("mousedown",mouseDown),
			d.removeEventListener("mouseleave",mouseLeave),
			window.removeEventListener("keydown",keyDown),
			window.removeEventListener("keyup",keyUp),
			clearInterval(render)
           
		}

		
		}
	
	t();
	
}

export {startCanvas,clear};
