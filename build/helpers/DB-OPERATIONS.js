"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_OPERATIONS = void 0;
const mssql_1 = __importDefault(require("mssql"));
const db_config_1 = require("../config/db-config");
/* EXPORT HELPER CLASS : DB_OPERATIONS */
class DB_OPERATIONS {
    /* APPEND REQUESTS TO INPUT */
    static appendRequests(request, data = {}) {
        const keys = Object.keys(data);
        keys.forEach(key => {
            request.input(key, data[key]);
        });
        return request;
    }
    /* DECORATOR FOR RETRYING EXECUTION IN CASE OF FAILURE */
    /* EXECUTE STORED PROCEDURES */
    static EXECUTE(storedProcedure, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = yield (yield this.pool).request();
            request = DB_OPERATIONS.appendRequests(request, data);
            return yield request.execute(storedProcedure);
        });
    }
    /* DECORATOR FOR LOGGING EXECUTED QUERIES */
    /* EXECUTE QUERIES */
    static QUERY(queryString) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (yield DB_OPERATIONS).pool).request().query(queryString);
        });
    }
}
DB_OPERATIONS.pool = mssql_1.default.connect(db_config_1.SQL_SERVER_CONFIG);
__decorate([
    retry(3)
    /* EXECUTE STORED PROCEDURES */
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DB_OPERATIONS, "EXECUTE", null);
__decorate([
    logQuery
    /* EXECUTE QUERIES */
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DB_OPERATIONS, "QUERY", null);
exports.DB_OPERATIONS = DB_OPERATIONS;
/* DECORATOR FOR RETRYING EXECUTION IN CASE OF FAILURE */
function retry(maxAttempts) {
    return function (target, propertyKey, descriptor) {
        const TARGET_METHOD = descriptor.value;
        descriptor.value = function (...args) {
            return __awaiter(this, void 0, void 0, function* () {
                for (let attempt = 1; attempt <= maxAttempts; attempt++) {
                    try {
                        return yield TARGET_METHOD.apply(this, args);
                    }
                    catch (error) {
                        console.error(`Attempt ${attempt}/${maxAttempts} failed. Retrying...`);
                        if (attempt === maxAttempts) {
                            throw error;
                        }
                    }
                }
            });
        };
    };
}
/* DECORATOR FOR LOGGING EXECUTED QUERIES */
function logQuery(target, propertyKey, descriptor) {
    const TARGET_METHOD = descriptor.value;
    descriptor.value = function (...args) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Executing query: %{args[0]}`);
            return yield TARGET_METHOD.apply(this, args);
        });
    };
}
