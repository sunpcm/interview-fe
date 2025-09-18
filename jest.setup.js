// jest.setup.js
import '@testing-library/jest-dom';

// 为 Jest 环境添加 TextEncoder/TextDecoder polyfill
// react-router-dom v7 需要这些 Web API
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
