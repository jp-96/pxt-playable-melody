/**
 * melody blocks
 * icon: a Unicode identifier for an icon from the Font Awesome icon set.
 *       http://fontawesome.io/icons
 */
//% weight=100 color=#696969 icon="\uf1b2"
namespace melody {
    const NOTE_HZ = [
        Note.C3, Note.CSharp3, Note.D3, Note.Eb3, Note.E3, Note.F3, Note.FSharp3, Note.G3, Note.GSharp3, Note.A3, Note.Bb3, Note.B3,
        Note.C4, Note.CSharp4, Note.D4, Note.Eb4, Note.E4, Note.F4, Note.FSharp4, Note.G4, Note.GSharp4, Note.A4, Note.Bb4, Note.B4,
        Note.C5, Note.CSharp5, Note.D5, Note.Eb5, Note.E5, Note.F5, Note.FSharp5, Note.G5, Note.GSharp5, Note.A5, Note.Bb5, Note.B5,
    ]

    const NOTE_NAME = [
        "C3", "C#3", "D3", "Eb3", "E3", "F3", "F#3", "G3", "G#3", "A3", "Bb3", "B3",
        "C4", "C#4", "D4", "Eb4", "E4", "F4", "F#4", "G4", "G#4", "A4", "Bb4", "B4",
        "C5", "C#5", "D5", "Eb5", "E5", "F5", "F#5", "G5", "G#5", "A5", "Bb5", "B5",
    ]

    export class Melody {
        id: number
        cb: () => void
        constructor(id: number, cb: () => void) {
            this.id = id
            this.cb = cb
        }
    }

    const _melodies: Melody[] = []
    const _notes: string[] = []

    /**
     * array of csv strings to array of strings
     * @param csv array of csv strings.
     * @returns array of strings
     */
    export function _csvToStrings(csv: string[]): string[] {
        const res: string[] = []
        for (const t of csv) {
            for (const s of t.split(",")) {
                const v = s.trim()
                if (v) {
                    res.push(v)
                }
            }
        }
        return res
    }

    /**
     * array melody to playable.
     * The notes in a melody are held in an array of strings. Each string in the array
     * is a note of the melody. You make a melody by assembling the notes along with
     * the duration that the note plays for. The melody is formed like this:
     * NOTE[octave][:duration] eg: ['g5:1']
     * see also: https://makecode.microbit.org/reference/music/making-melodies
     * @param melody array of strings
     * @returns Playable object
     */
    //% blockId="melody_array_playable"
    //% block="melody(array) $melody"
    //% weight=83 blockGap=8
    //% duplicateShadowOnDrag
    //% group="Melody"
    export function arrayPlayable(melody: string[]): music.Playable {
        return new music.StringArrayPlayable(_csvToStrings(melody), undefined)
    }

    /**
     * hex melody to playable.
     * The hex format is 2 bytes (4 characters) per note. First note byte is midi
     * note number, second byte is duration in quarter beats. The note
     * number 0 is reserved for rests.
     * hex examples: https://github.com/microsoft/pxt-microbit/blob/master/libs/core/melodies.ts
     * @param melody hex text
     * @returns Playable object
     */
    //% blockId="melody_hex_playable"
    //% block="melody(hex) $melody"
    //% weight=82 blockGap=8
    //% duplicateShadowOnDrag
    //% group="Melody"
    export function hexPlayable(melody: string): music.Playable {
        return new music.StringArrayPlayable(music._bufferToMelody(Buffer.fromHex(melody)), undefined)
    }

    function _hzToNote(hz: number): string {
        let left = 0
        let right = NOTE_HZ.length - 1
        if (hz < NOTE_HZ[left]) {
            return NOTE_NAME[left]
        }
        if (hz > NOTE_HZ[right]) {
            return NOTE_NAME[right]
        }
        while (true) {
            const mid = Math.floor((left + right) / 2)
            if (hz < NOTE_HZ[mid]) {
                right = mid
            } else {
                left = mid
            }
            if (right - left > 1) {
                console.log("left:" + left + " right:" + right)
                continue
            }
            if ((hz - NOTE_HZ[left]) < (NOTE_HZ[right] - hz)) {
                console.log("hit:" + left + " hz:" + hz)
                return NOTE_NAME[left]
            }
            console.log("hit:" + right + " hz:" + hz)
            return NOTE_NAME[right]
        }
    }

    function _getNote(name: Note): string {
        let note = "R"
        switch (name) {
            case Note.C3:
                note = "C3"
                break
            case Note.CSharp3:
                note = "C#3"
                break
            case Note.D3:
                note = "D3"
                break
            case Note.Eb3:
                note = "Eb3"
                break
            case Note.E3:
                note = "E3"
                break
            case Note.F3:
                note = "F3"
                break
            case Note.FSharp3:
                note = "F#3"
                break
            case Note.G3:
                note = "G3"
                break
            case Note.GSharp3:
                note = "G#3"
                break
            case Note.A3:
                note = "A3"
                break
            case Note.Bb3:
                note = "Bb3"
                break
            case Note.B3:
                note = "B3"
                break
            case Note.C4:
                note = "C4"
                break
            case Note.CSharp4:
                note = "C#4"
                break
            case Note.D4:
                note = "D4"
                break
            case Note.Eb4:
                note = "Eb4"
                break
            case Note.E4:
                note = "E4"
                break
            case Note.F4:
                note = "F4"
                break
            case Note.FSharp4:
                note = "F#4"
                break
            case Note.G4:
                note = "G4"
                break
            case Note.GSharp4:
                note = "G#4"
                break
            case Note.A4:
                note = "A4"
                break
            case Note.Bb4:
                note = "Bb4"
                break
            case Note.B4:
                note = "B4"
                break
            case Note.C5:
                note = "C5"
                break
            case Note.CSharp5:
                note = "C#5"
                break
            case Note.D5:
                note = "D5"
                break
            case Note.Eb5:
                note = "Eb5"
                break
            case Note.E5:
                note = "E5"
                break
            case Note.F5:
                note = "F5"
                break
            case Note.FSharp5:
                note = "F#5"
                break
            case Note.G5:
                note = "G5"
                break
            case Note.GSharp5:
                note = "G#5"
                break
            case Note.A5:
                note = "A5"
                break
            case Note.Bb5:
                note = "Bb5"
                break
            case Note.B5:
                note = "B5"
                break
            default:
                break
        }
        return note
    }

    //% block="note %name %fraction|beat"
    //% name.fieldEditor="note" name.defl="262"
    //% name.fieldOptions.decompileLiterals=true
    //% useEnumVal=1
    export function declareNote(name: Note, fraction: BeatFraction) {
        const note = _hzToNote(name)
        let duration = 4
        switch (fraction) {
            case BeatFraction.Whole:    // ok
                //return beat;
                duration = 4
                break;
            case BeatFraction.Half:     // ok
                //return beat >> 1;
                duration = 2
                break;
            case BeatFraction.Quarter:  // ok
                //return beat >> 2;
                duration = 1
                break;
            case BeatFraction.Eighth:   // not supported
                //return beat >> 3;
                duration = 1
                break;
            case BeatFraction.Sixteenth: // not supported
                // return beat >> 4;
                duration = 1
                break;
            case BeatFraction.Double:   // ok
                //return beat << 1;
                duration = 8
                break;
            case BeatFraction.Breve:    // ok
                //return beat << 2;
                duration = 16
                break;
            default:
                break;
        }
        _notes.push(note + ":" + duration)
    }

    //% block="melody id:$id"
    export function melodyPlayable(id: number): music.Playable {
        while (_notes.length > 0) {
            _notes.shift()
        }
        for (const s of _melodies) {
            if (s.id == id) {
                s.cb()
                console.log(_notes)
                return arrayPlayable(_notes)
            }
        }
        return arrayPlayable([])
    }

    //% block="melody id $id"
    export function declareMelody(id: number, body: () => void) {
        const melody = new Melody(id, body)
        _melodies.push(melody)
    }
}
