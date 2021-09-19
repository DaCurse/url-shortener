import { Injectable } from '@nestjs/common';

const BYTE_LENGTH = 8;

@Injectable()
export class RedirectService {
  private decode(code: string): string {
    const baseValue = 0x200b;
    const bytes = [];
    let currentByte = 0;
    for (let i = 0; i < code.length; i++) {
      const value = code.charCodeAt(i) - baseValue;
      currentByte += value << (BYTE_LENGTH - 1 - (i % BYTE_LENGTH));
      if ((i + 1) % BYTE_LENGTH === 0) {
        bytes.push(String.fromCharCode(currentByte));
        currentByte = 0;
      }
    }
    return bytes.join('');
  }

  private encode(code: string): string {
    const encodingMap: Record<string, string> = {
      0: '\u200b',
      1: '\u200c',
    };
    let encoded = '';
    for (const char of code) {
      encoded += char
        .charCodeAt(0)
        .toString(2)
        .padStart(BYTE_LENGTH, '0')
        .replace(/0|1/g, (match) => encodingMap[match]);
    }
    return encodeURIComponent(encoded);
  }

  tryDecode(code: string): string {
    const encodedRegex = /\u200b|\u200c/;
    if (encodedRegex.test(code) && code.length % BYTE_LENGTH === 0) {
      return this.decode(code);
    } else {
      return code;
    }
  }
}
