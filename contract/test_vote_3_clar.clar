;; Enhanced Decentralized Voting Smart Contract (3.0 version)

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-already-voted (err u101))
(define-constant err-candidate-not-found (err u102))
(define-constant err-voting-not-started (err u103))
(define-constant err-voting-ended (err u104))
(define-constant err-not-a-member (err u105))

;; Data Variables
(define-data-var voters-count uint u0)
(define-data-var voting-status bool false)
(define-data-var voting-end-height uint u0)
(define-data-var candidates-names (list 20 (string-ascii 50)) (list))

;; Data Maps
(define-map candidates {name: (string-ascii 50)} {votes: uint})
(define-map has-voted {voter: principal} {voted: bool})
(define-data-var members (list 100 principal) (list))

;; Private Functions

;; Function to add a single candidate
(define-private (add-single-candidate (name (string-ascii 50)))
    (map-set candidates {name: name} {votes: u0})
)


;; Public Functions

;; Function to start the voting process
(define-public (start-voting (candidate-list (list 20 (string-ascii 50))) (duration uint) (voters (list 100 principal)))
    (begin
        (asserts! (is-eq tx-sender contract-owner) err-owner-only)
        (asserts! (not (var-get voting-status)) err-voting-not-started)
        
        (var-set voting-status true)
        (var-set candidates-names candidate-list)
        (var-set members voters)
        (var-set voting-end-height (+ block-height duration))
        (map add-single-candidate candidate-list)
        (ok true)
    )
)

;; Function to end the voting process
(define-public (end-voting)
    (begin
        (asserts! (is-eq tx-sender contract-owner) err-owner-only)
        (asserts! (var-get voting-status) err-voting-not-started)
        (var-set voters-count u0)
        (var-set voting-status false)
        (var-set candidates-names (list))
        (var-set members (list))
        (ok true)
    )
)

;; Function to cast a vote
(define-public (vote (candidate-name (string-ascii 50)))
    (let (
        (candidate (unwrap! (map-get? candidates {name: candidate-name}) err-candidate-not-found))
        (has-voted-before (default-to false (get voted (map-get? has-voted {voter: tx-sender}))))
    )
        (asserts! (is-some (index-of (var-get members) contract-caller)) err-not-a-member)
        (asserts! (var-get voting-status) err-voting-not-started)
        (asserts! (<= block-height (var-get voting-end-height)) err-voting-ended)
        (asserts! (not has-voted-before) err-already-voted)
        (map-set candidates {name: candidate-name} 
            {votes: (+ (get votes candidate) u1)})
        (map-set has-voted {voter: tx-sender} {voted: true})
        (var-set voters-count (+ (var-get voters-count) u1))
        (ok true)
    )
)

;; Read-only Functions

;; Function to get the number of votes for a specific candidate
(define-read-only (get-candidate-votes (name (string-ascii 50)))
    (ok (get votes (default-to {votes: u0} (map-get? candidates {name: name}))))
)

;; Function to get the total number of voters
(define-read-only (get-total-voters)
    (ok (var-get voters-count))
)

;; Function to check if an address has voted
(define-read-only (has-address-voted (address principal))
    (ok (default-to false (get voted (map-get? has-voted {voter: address}))))
)

;; Function to check if voting is currently active
(define-read-only (is-voting-active)
    (ok (and (var-get voting-status) (<= block-height (var-get voting-end-height))))
)

;; Function to retrieve the all the candidates
(define-read-only (get-candidates) 
    (ok (var-get candidates-names))
)

(define-read-only (get-members)
    (ok (var-get members))
)