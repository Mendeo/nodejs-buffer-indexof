//Оказывается встроенный indexOf не может работать с буферами больше 2ГиБ.
function indexOf(buf, what, start)
{
	const MAX_INDEXOF_BUFFER_LENGTH = 2147483647;
	if (start === undefined) start = 0;
	if (buf.byteLength <= MAX_INDEXOF_BUFFER_LENGTH) return buf.indexOf(what, start);
	let chunk = buf.subarray(start);
	if (chunk.byteLength <= MAX_INDEXOF_BUFFER_LENGTH)
	{
		const result = chunk.indexOf(what);
		if (result === -1) return -1;
		return chunk.indexOf(what) + start;
	}

	const whatBuf = Buffer.from(what);
	const numOfSubChunks = Math.floor(chunk.byteLength / MAX_INDEXOF_BUFFER_LENGTH) + 1;
	let indexStart = 0;
	let indexEnd = MAX_INDEXOF_BUFFER_LENGTH;
	for (let i = 0; i < numOfSubChunks; i++)
	{
		const subChunk = chunk.subarray(indexStart, indexEnd);
		let result = subChunk.indexOf(what);
		if (result !== -1) return result + start + indexStart;
		const subSubChunk = chunk.subarray(indexEnd - whatBuf.byteLength, indexEnd + whatBuf.byteLength);
		result = subSubChunk.indexOf(what);
		if (result !== -1) return indexEnd - whatBuf.byteLength + result + start;
		indexStart = indexEnd;
		indexEnd = indexStart + MAX_INDEXOF_BUFFER_LENGTH;
	}
	return -1;
}