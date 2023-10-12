/*
<< Description >>
Write a C program that reads integers from a file (one number per line) and finds and 
prints the number that occurs the fewest times and the number that occurs the most 
times along with their number of occurrences. Assume that all numbers will be in the 
range [0, 100] and that the file will not contain more than 100 numbers.

<< Author >>
Raphael Papadakis
*/

#include <stdio.h>
#include <stdlib.h>

int main() {
	int i = 0, n, counter[101] = {0}, min = 0, max = 0, counter_max = -1000, counter_min = 1000;
	
	FILE *f = fopen("numbers.txt", "r");
	while (fscanf(f,"%d",&n) != EOF) {	
		counter[n]++;
	}
	fclose(f);
	
	for(i = 0; i <= 100; i++) {
		if(counter_min > counter[i] && counter[i] > 0) {
			min = i;
			counter_min = counter[i];
		}
		
		if(counter_max < counter[i]) {
			max = i;
			counter_max = counter[i];
		}
	}
	
	printf("Max: %d, found %d times.\nMin: %d, found %d times.\n", max, counter_max, min, counter_min);

	return 0;
}
