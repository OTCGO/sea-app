const documentEvents = ["abort","beforeinput","blur","click","compositionstart","compositionupdate","compositionend","dblclick","error","focus","focusin","focusout","input","keydown","keypress","keyup","load","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup","resize","scroll","select","unload","wheel"]

export const createEventSelectors = (suga) =>
  documentEvents.map(event => `[${event}.${suga}]`)
                .join(', ')

