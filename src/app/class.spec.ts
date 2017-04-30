import { async } from '@angular/core/testing';

import { Discount } from './classes';


describe('Discount', ()=>{


	it('should verify the value of the discount', async(()=>{
		const dis = new Discount('Papa', 300, true);
		const valid = dis.isValidValue();

		expect(valid).toBeFalsy();

	}))
	it('should verify the value of the discount', async(()=>{
		const dis = new Discount('Papa', -20, true);
		const valid = dis.isValidValue();

		expect(valid).toBeFalsy();

	}))
	it('should verify the value of the discount', async(()=>{
		const dis = new Discount('Papa', -3000, false);
		const valid = dis.isValidValue();

		expect(valid).toBeFalsy();

	}))
	it('should verify the value of the discount', async(()=>{
		const dis = new Discount('Papa', 300, true);
		const valid = dis.isValidValue();

		expect(valid).toBeFalsy();

	}))
	it('should verify the value of the discount', async(()=>{
		const dis = new Discount('Papa', 30, true);
		const valid = dis.isValidValue();

		expect(valid).toBeFalsy();

	}))
	it('should verify the value of the discount', async(()=>{
		const dis = new Discount('Papa', 30, true);
		const valid = dis.isValidValue();

		expect(valid).toBeTruthy();

	}))

})